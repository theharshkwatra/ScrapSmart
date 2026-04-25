const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getDB} = require('../config/db');

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId.toString()},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    );
};



// REGISTER
exports.register = async (req, res) => {
    try{
        const {name, email, phone, password} = req.body; // req.body contains the JSON data the frontend sent.
        if(!name || !email || !phone || !password){
            return res.status(400).json({
                success: false,
                message: 'All fields are required. Please provide name, email, phone, and password.'
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: 'Password must be at least  characters long'
            });
        }
        
        const db = getDB();
        const existingUser = await db.collection('users').findOne({
            email: email.toLowerCase()
        });

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12); // 12 is salt rounds, the number of times the hashing runs

        const newUser = {
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            password: hashedPassword,
            isActive: true,
            createdAt: new Date()
        };

        const result = await db.collection('users').insertOne(newUser);
        const token = generateToken(result.insertedId);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: result.insertedId,
                name: newUser.name,
                email: newUser.email
            }
        });
    }catch(error){
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !!password){
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        const db = getDB();
        const user = await db.collection('users').findOne({
            email: email.toLowerCase()
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if(!user.isActive){
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated. Please contact support for assistance.'
            });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// GET PROFILE
exports.getMe = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};