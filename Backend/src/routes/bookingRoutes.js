const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getBookingsById,
    cancelBooking,
    updateBooking,
    addScrapTypeToBooking,
    removeScrapTypeFromBooking,
    getBookingsByDateRange,
    searchBookings,
    getBookingsByStatus,
    getBookingStats,
    getMonthlyTrends,
    getCollectorStats,
    getAvailableBookings,
    acceptBooking,
    completeBooking,
    getMyAssignedBookings
} = require('../controllers/bookingController');
const {protect} = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createBooking);
router.get('/stats', getBookingStats);
router.get('/trends/:year', getMonthlyTrends);
router.get('/search', searchBookings);
router.get('/date-range', getBookingsByDateRange);
router.get('/status/:statuses', getBookingsByStatus);
router.get('/collector-stats', getCollectorStats);
router.get('/available', getAvailableBookings);
router.get('/my-assigned', getMyAssignedBookings);
router.get('/', getMyBookings);
router.get('/:id', getBookingsById);

router.put('/:id', updateBooking);
router.put('/:id/cancel', cancelBooking);
router.put('/:id/scrap/add', addScrapTypeToBooking);
router.put('/:id/scrap/remove', removeScrapTypeFromBooking);
router.put('/:id/accept', acceptBooking);
router.put('/:id/complete', completeBooking);

module.exports = router;