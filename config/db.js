const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1)
  }
}

module.exports = {run, client}