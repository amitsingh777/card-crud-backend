const { MongoClient } = require("mongodb");
const uri = process.env.URI.replace("<password>", process.env.PASSWORD);

const mongoClient = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
  });
  
  await client.connect();
  return client;
};

module.exports = mongoClient;
