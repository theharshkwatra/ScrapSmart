// HOW TO RUN: npm run setup-db
// including .env especially in this because this script runs separately and cant use dotenv through server.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

const setup = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB for setup...');

    const db = client.db('scrapsmart');

    const existing = await db.listCollections().toArray();
    const existingNames = existing.map(c => c.name);
    console.log('Existing collections:', existingNames.length ? existingNames.join(', ') : 'None');

    if (!existingNames.includes('users')) {
      await db.createCollection('users');
      console.log('Created collection: users');
    } else {
      console.log('Skipped: users already exists');
    }

    if (!existingNames.includes('bookings')) {
      await db.createCollection('bookings');
      console.log('Created collection: bookings');
    } else {
      console.log('Skipped: bookings already exists');
    }

    if (!existingNames.includes('notifications')) {
      await db.createCollection('notifications');
      console.log('Created collection: notifications');
    } else {
      console.log('Skipped: notifications already exists');
    }

    console.log('\nCreating indexes...');

    await db.collection('users').createIndex(
      { email: 1 },
      { unique: true, name: 'idx_users_email_unique' }
    );
    console.log('Index: users.email (unique)');

    await db.collection('bookings').createIndex(
      { userId: 1 },
      { name: 'idx_bookings_userId' }
    );
    console.log('Index: bookings.userId');

    await db.collection('bookings').createIndex(
      { status: 1 },
      { name: 'idx_bookings_status' }
    );
    console.log('Index: bookings.status');

    await db.collection('bookings').createIndex(
      { userId: 1, status: 1 },
      { name: 'idx_bookings_userId_status' }
    );
    console.log('Index: bookings.userId + status (compound)');

    console.log('\nDatabase setup complete!');

  } catch (error) {
    console.error('Error during setup:', error.message);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

setup();