const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  try {
    await client.connect();
    const dbName = process.env.MONGO_DB_NAME || 'scrapsmart';
    db = client.db(dbName);
    
    // Add INDEXING
    try {
      await db.collection('bookings').createIndex({ userId: 1 });
      await db.collection('bookings').createIndex({ status: 1 });
      await db.collection('bookings').createIndex({ scheduledDate: -1 });
    } catch (indexErr) {
      console.log('Indexes already exist or could not be created:', indexErr.message);
    }

    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if(!db) {
    throw new Error('Database not initialized. Call connectDB() first.'); 
  }
  return db;
}

module.exports = {connectDB, getDB};