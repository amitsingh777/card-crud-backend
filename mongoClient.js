const { MongoClient } = require("mongodb");
const uri = process.env.URI.replace("<password>", process.env.PASSWORD);

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

module.exports = client;
