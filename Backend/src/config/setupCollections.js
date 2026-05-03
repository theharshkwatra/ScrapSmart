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

    await db.collection('users').createIndex(
      { phone: 1 },
      { name: 'idx_users_phone' }
    );
    console.log('Index: users.phone');

    await db.collection('users').createIndex(
      { role: 1 },
      { name: 'idx_users_role' }
    );
    console.log('Index: users.role');

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

    await db.collection('bookings').createIndex(
      { userId: 1, scheduledDate: -1 },
      { name: 'idx_bookings_userId_date_desc' }
    );
    console.log('Index: bookings.userId + scheduledDate (desc)');

    await db.collection('bookings').createIndex(
      { status: 1, scheduledDate: 1 },
      { name: 'idx_bookings_status_date' }
    );
    console.log('Index: bookings.status + scheduledDate (compound)');

    await db.collection('bookings').createIndex(
      { 'address.street': 'text', 'address.city': 'text' },
      { name: 'idx_bookings_address_text' }
    );
    console.log('Index: bookings.address (text)');

    await db.collection('notifications').createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 30 * 24 * 60 * 60, name: 'idx_notifications_ttl' }
    );
    console.log('Index: notifications.createdAt (TTL - 30 days)');

    await db.collection('bookings').createIndex(
      { scheduledDate: 1 },
      {
        name: 'idx_bookings_pending_scheduled',
        partialFilterExpression: { status: 'pending' }
      }
    );
    console.log('Index: bookings.scheduledDate (partial - pending only)');

    await db.collection('bookings').createIndex(
      { estimatedWeight: 1 },
      { sparse: true, name: 'idx_bookings_weight_sparse' }
    );
    console.log('Index: bookings.estimatedWeight (sparse)');

    console.log('\nDatabase setup complete!');

  } catch (error) {
    console.error('Error during setup:', error.message);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

setup();