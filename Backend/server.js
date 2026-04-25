require("dotenv").config();

const express = require('express');
const cors = require('cors');
const {connectDB} = require('./src/config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

app.get('/', (req, res) => {
    res.json({
        message: 'ScrapSMart API is running',
        version: '1.0.0'
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});


app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
        error: err.message
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});