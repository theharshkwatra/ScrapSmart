const express = require('express');
const router = express.Router();
const {createBooking, getMyBookings, getBookingsById, cancelBooking} = require('../controllers/bookingController');
const {protect} = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createBooking);
router.get('/', getMyBookings);
router.get('/:id', getBookingsById);
router.put('/:id/cancel', cancelBooking);

module.exports = router;