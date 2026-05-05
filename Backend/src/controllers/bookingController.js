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

        if(!address.street || !address.city || !address.pincode){
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
        const insertedBooking = await db.collection('bookings').findOne({_id: result.insertedId});
        
        return res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: insertedBooking
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


//DELETE BOOKING
exports.deleteBooking = async (req, res) => {
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
                success: false,
                message: 'Completed bookings cannot be deleted.'
            });
        }

        const deleted = await db.collection('bookings').findOneAndDelete(
            {_id: bookingObjectId}
        );

        res.json({
            success: true,
            message: 'Booking deleted successfully.',
            booking: deleted
        });
    }catch(error){
        console.error('Error deleting booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.updateBooking = async (req, res) => {
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

        const {address, scheduledDate, timeSlot, scrapTypes, estimatedWeight} = req.body;

        const updateFields = {};
        if(address) {
            if(address.street) updateFields['address.street'] = address.street;
            if(address.city) updateFields['address.city'] = address.city;
            if(address.pincode) updateFields['address.pincode'] = address.pincode;
        }
        if(scheduledDate) updateFields.scheduledDate = new Date(scheduledDate);
        if(timeSlot) updateFields.timeSlot = timeSlot;
        if(scrapTypes) updateFields.scrapTypes = scrapTypes;
        if(estimatedWeight) updateFields.estimatedWeight = estimatedWeight;
        updateFields.updatedAt = new Date();

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookingObjectId, userId: req.user._id},
            {$set: updateFields},
            {returnDocument: 'after'}
        );

        if(!updated){
            return res.status(404).json({
                success: false,
                message: 'Booking not found or unauthorized.'
            });
        }

        res.json({
            success: true,
            message: 'Booking updated successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error updating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.addScrapTypeToBooking = async (req, res) => {
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

        const {scrapType} = req.body;
        if(!scrapType){
            return res.status(400).json({
                success: false,
                message: 'Please provide a scrapType to add.'
            });
        }

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookingObjectId, userId: req.user._id},
            {$addToSet: {scrapTypes: scrapType}},
            {returnDocument: 'after'}
        );

        if(!updated){
            return res.status(404).json({
                success: false,
                message: 'Booking not found or unauthorized.'
            });
        }

        res.json({
            success: true,
            message: 'Scrap type added successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error adding scrap type:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.removeScrapTypeFromBooking = async (req, res) => {
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

        const {scrapType} = req.body;
        if(!scrapType){
            return res.status(400).json({
                success: false,
                message: 'Please provide a scrapType to remove.'
            });
        }

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookingObjectId, userId: req.user._id},
            {$pull: {scrapTypes: scrapType}},
            {returnDocument: 'after'}
        );

        if(!updated){
            return res.status(404).json({
                success: false,
                message: 'Booking not found or unauthorized.'
            });
        }

        res.json({
            success: true,
            message: 'Scrap type removed successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error removing scrap type:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getBookingsByDateRange = async (req, res) => {
    try{
        const db = getDB();
        const {startDate, endDate, minWeight, maxWeight, status} = req.query;

        const query = {userId: req.user._id};

        if(startDate || endDate){
            query.scheduledDate = {};
            if(startDate) query.scheduledDate.$gte = new Date(startDate);
            if(endDate) query.scheduledDate.$lte = new Date(endDate);
        }

        if(minWeight){
            query.estimatedWeight = {$gte: parseFloat(minWeight)};
        }

        if(maxWeight){
            query.estimatedWeight = {...query.estimatedWeight, $lte: parseFloat(maxWeight)};
        }

        if(status){
            query.status = {$in: status.split(',')};
        }

        const bookings = await db.collection('bookings')
            .find(query)
            .sort({scheduledDate: -1})
            .toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error fetching bookings by date range:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.searchBookings = async (req, res) => {
    try{
        const db = getDB();
        const {q} = req.query;

        if(!q){
            return res.status(400).json({
                success: false,
                message: 'Please provide a search query.'
            });
        }

        const bookings = await db.collection('bookings').find({
            $or: [
                {'address.street': {$regex: q, $options: 'i'}},
                {'address.city': {$regex: q, $options: 'i'}},
                {scrapTypes: {$regex: q, $options: 'i'}}
            ],
            userId: req.user._id
        }).toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error searching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getBookingsByStatus = async (req, res) => {
    try{
        const db = getDB();
        const {statuses} = req.params;

        const statusArray = statuses.split(',');

        const bookings = await db.collection('bookings').find({
            status: {$in: statusArray},
            userId: req.user._id
        }).toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error fetching bookings by status:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getBookingStats = async (req, res) => {
    try{
        const db = getDB();

        const stats = await db.collection('bookings').aggregate([
            {
                $match: { userId: req.user._id }
            },
            {
                $group: {
                    _id: '$status',
                    count: {$sum: 1},
                    totalWeight: {$sum: {$ifNull: ['$estimatedWeight', 0]}},
                    avgWeight: {$avg: '$estimatedWeight'},
                    latestBooking: {$max: '$createdAt'}
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        const overallStats = await db.collection('bookings').aggregate([
            {$match: { userId: req.user._id }},
            {
                $group: {
                    _id: null,
                    totalBookings: {$sum: 1},
                    totalWeight: {$sum: {$ifNull: ['$estimatedWeight', 0]}},
                    avgWeight: {$avg: '$estimatedWeight'},
                    minWeight: {$min: '$estimatedWeight'},
                    maxWeight: {$max: '$estimatedWeight'}
                }
            }
        ]).toArray();

        res.json({
            success: true,
            byStatus: stats,
            overall: overallStats[0] || {}
        });
    }catch(error){
        console.error('Error fetching booking stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getMonthlyTrends = async (req, res) => {
    try{
        const db = getDB();
        const {year} = req.params;

        const trends = await db.collection('bookings').aggregate([
            {
                $match: {
                    userId: req.user._id,
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${parseInt(year) + 1}-01-01`)
                    }
                }
            },
            {
                $project: {
                    month: {$month: '$createdAt'},
                    status: 1,
                    estimatedWeight: 1
                }
            },
            {
                $group: {
                    _id: {month: '$month', status: '$status'},
                    count: {$sum: 1},
                    totalWeight: {$sum: {$ifNull: ['$estimatedWeight', 0]}}
                }
            },
            {
                $sort: {'_id.month': 1}
            }
        ]).toArray();

        res.json({
            success: true,
            year: parseInt(year),
            trends
        });
    }catch(error){
        console.error('Error fetching monthly trends:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getCollectorStats = async (req, res) => {
    try{
        const db = getDB();

        const stats = await db.collection('bookings').aggregate([
            {
                $match: {
                    $or: [
                        {status: 'accepted'},
                        {status: 'completed'}
                    ]
                }
            },
            {
                $group: {
                    _id: '$status',
                    count: {$sum: 1},
                    totalWeight: {$sum: {$ifNull: ['$estimatedWeight', 0]}}
                }
            }
        ]).toArray();

        const availableBookings = await db.collection('bookings').aggregate([
            {$match: {status: 'pending'}},
            {$count: 'pendingCount'}
        ]).toArray();

        res.json({
            success: true,
            statsByStatus: stats,
            availablePending: availableBookings[0]?.pendingCount || 0
        });
    }catch(error){
        console.error('Error fetching collector stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// GET AVAILABLE BOOKINGS FOR COLLECTORS
exports.getAvailableBookings = async (req, res) => {
    try{
        const db = getDB();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const bookings = await db.collection('bookings').aggregate([
            {
                $match: {
                    $and: [
                        {status: {$in: ['pending', 'confirmed']}},
                        {scheduledDate: {$gte: today}}
                    ]
                }
            },
            {$addFields: {timeSort: {$indexOfArray: [['9am-12pm', '12pm-3pm', '3pm-6pm'], '$timeSlot']}}},
            {$sort: {scheduledDate: 1, timeSort: 1, createdAt: 1}},
            {$project: {timeSort: 0}}
        ]).toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error fetching available bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// ACCEPT BOOKING BY COLLECTOR
exports.acceptBooking = async (req, res) => {
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

        if(booking.status !== 'pending' && booking.status !== 'confirmed'){
            return res.status(400).json({
                success: false,
                message: 'Booking is not available for acceptance.'
            });
        }

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookingObjectId},
            {$set: {status: 'assigned', collectorId: req.user._id, collectorName: req.user.name, assignedAt: new Date()}},
            {returnDocument: 'after'}
        );

        res.json({
            success: true,
            message: 'Booking accepted successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error accepting booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// COMPLETE BOOKING BY COLLECTOR
exports.completeBooking = async (req, res) => {
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

        if(booking.collectorId?.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to complete this booking.'
            });
        }

        if(booking.status !== 'assigned'){
            return res.status(400).json({
                success: false,
                message: 'Booking must be assigned before completion.'
            });
        }

        const updated = await db.collection('bookings').findOneAndUpdate(
            {_id: bookingObjectId},
            {$set: {status: 'completed', completedAt: new Date()}},
            {returnDocument: 'after'}
        );

        res.json({
            success: true,
            message: 'Booking completed successfully.',
            booking: updated
        });
    }catch(error){
        console.error('Error completing booking:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// GET MY ASSIGNED BOOKINGS FOR COLLECTORS
exports.getMyAssignedBookings = async (req, res) => {
    try{
        const db = getDB();
        const bookings = await db.collection('bookings')
        .find({collectorId: req.user._id, status: 'assigned'})
        .sort({assignedAt: -1})
        .toArray();

        res.json({
            success: true,
            count: bookings.length,
            bookings
        });
    }catch(error){
        console.error('Error fetching assigned bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};