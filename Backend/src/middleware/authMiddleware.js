const jwt = require('jsonwebtoken');
const {getDB} = require('../config/db');

const {ObjectId} = require('mongodb');

const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];// "Bearer eyJhbGci...".split(' ') gives ["Bearer", "eyJhbGci..."]
    }

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Access denied. Please log in to continue.'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const db = getDB();
        const user = await db.collection('users').findOne(
            {_id: new ObjectId(decoded.id)},
            {projection: {password: 0}} // Exclude password
        );

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'The user associated with this token no longer exists.'
            });
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please log in again.'
        });
    }
};

module.exports = {protect};