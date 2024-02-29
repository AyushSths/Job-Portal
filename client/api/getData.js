// getData.js
const { MongoClient } = require('mongodb');

async function getData(req, res) {
    const uri = 'mongodb+srv://ayushsthx088:mongo3d2y@cluster0.nmse8gp.mongodb.net/portal-db?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('your_database_name');
        const collection = database.collection('your_collection_name');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
}

module.exports = getData;
