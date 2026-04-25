const {getDB} = require('../config/db');
const {ObjectId} = require('mongodb');
// const {sendBookingEmail, sendBookingSMS} = require('./notificationController');


// CREATE BOOKING
exports.createBooking = async (req, res) => {
    try{
        const {address, scheduledDate, timeSlot, scrapTypes, estimatedWeight} = req.body;
        if(!address || !scheduledDate || !timeSlot || !scrapTypes){
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: address, scheduledDate, timeSlot, scrapTypes'
            });
        }

        if(!address.street || !address.city || address.pincode){
            return res.status(400).json({
                success: false,
                message: 'Address must include street, city and pincode'
            });
        }

        const validSlots = ['9am-12pm', '12pm-3pm', '3pm-6pm'];
        if(!validSlots.includes(timeSlot)){
            return res.status(400).json({
                success: false,
                message: 'Time slot must be one of: ${validSlots.join(", ")}'
            });
        }

        if(!Array.isArray(scrapTypes) || scrapTypes.length === 0){
            return res.status(400).json({
                success: false,
                message: 'Scrap types must be a non-empty array'
            });
        }

        const pickupDate = new Date(scheduledDate);
        const today = new Date();
        if(pickupDate < today){
            return res.status(400).json({
                success: false,
                message: 'Scheduled time must be in the future'
            })
        }

        const db = getDB();
        const newBooking = {
            userId: req.user._id,
            address: {
                street: address.street,
                city: address.city,
                pincode: address.pincode
            },
            scheduledDate: new Date(scheduledDate),
            timeSlot,
            scrapTypes,
            estimatedWeight: estimatedWeight || null,
            status: 'pending',
            createdAt: new Date()
        };

        const result = await db.collection('bookings').insertOne(newBooking);
        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: result.ops[0]
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// GET MY BOOKINGS
exports.getMyBookings = async (req, res) => {
    try{
        const db = getDB();
        const bookings = await db.collection('bookings')
        .find({userId: req.user._id})
        .sort({createdAt: -1})
        .toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// GET BOOKING BY ID
exports.getBookingsById = async (req, res) => {
    try{
        const db = getDB();
        let bookingObjectId;
        try{
            bookingObjecId = new ObjectId(req.params.id);
        }catch{
            return res.status(400).json({
                success: false,
                message: 'Invalid booking ID format.'
            });
        }

        const booking = await db.collection('bookings').findOne({
            _id: bookingObjectId
        });

        if(!booking){
            return res.status(404).json({
                success: false,
                message: 'Booking not found.'
            });
        }

        const isOwner = booking.userId.toString() === req.user._id.toString();
        if(!isOwner){
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this booking.'
            });
        }

        res.json({
            success: true,
            booking
        });
    }catch(error){
        console.error('Error fetching booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


//CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
    try{
        const db = getDB();
        let bookingObjectId;
        try{
            bookingObjectId = new ObjectId(req.params.id);
        }catch{
            return res.status(400).json({
                success: false,
                message: 'Invalid booking ID format.'
            });
        }

        const booking = await db.collection('bookings').findOne({
            _id: bookingObjectId
        });

        if(!booking){
            return res.status(404).json({
                success: false,
                message: 'Booking not found.'
            });
        }

        if(booking.status === 'completed'){
            return res.status(400).json({
                sucess: false,
                message: 'Completed bookings cannot be cancelled.'
            });
        }

        if(booking.status === 'cancelled'){
            return res.status(400).json({
                success: false,
                message: 'Booking has already been cancelled.'
            });
        }

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookigObjectId},
            {$set: {staus: 'cancelled'}},
            {returnDocument: 'after'}
        );

        res.json({
            succcess: true,
            message: 'Booking cancelled successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}