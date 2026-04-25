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
        const {name, email, phone, password, role} = req.body;
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
        const collectionName = role === 'collector' ? 'collectors' : 'users';
        
        const existingUser = await db.collection(collectionName).findOne({
            email: email.toLowerCase()
        });

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'An account with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            password: hashedPassword,
            role: role || 'pickup',
            isActive: true,
            createdAt: new Date()
        };

        const result = await db.collection(collectionName).insertOne(newUser);
        const token = generateToken(result.insertedId);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: result.insertedId,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
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
        const {email, password, role} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password'
            });
        }

        const db = getDB();
        const collectionName = role === 'collector' ? 'collectors' : 'users';
        
        const user = await db.collection(collectionName).findOne({
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
                email: user.email,
                role: user.role
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