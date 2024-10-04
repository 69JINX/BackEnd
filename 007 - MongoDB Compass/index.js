const { MongoClient } = require('mongodb');

const dbName = 'temp_db'
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Connecting to Database
const connection = async () => {
    await client.connect();
    const db = client.db(dbName); // will create a database named 'temp_db' if does not exist
    return db;
}

// Insert Data
const inserData = async () => {
    const db = await connection();
    const collection = db.collection('users');
    const response = await collection.insertOne({
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    });
    console.log(response);
}

// Read Data
const readData = async () => {
    const db = await connection();
    const collection = db.collection('users');
    const response = await collection.find().toArray();
    console.log(response);
}

// Update Data
const updateData = async () => {
    const db = await connection();
    const collection = db.collection('users');
    const response = await collection.updateMany(
        {
            name: 'John Doe'
        },
        {
            $set: {
                name: 'Adam Clark'
            }
        }
    )
    console.log(response);
}

// Delete Data
const deleteData = async () => {
    const db = await connection();
    const collection = db.collection('users');
    const response = await collection.deleteMany({
        name: 'Adam Clark'
    })
    console.log(response);
}


// inserData();
// readData();
// updateData();
// deleteData();
