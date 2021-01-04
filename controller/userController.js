const mongoClient = require("../mongoClient");
const { ObjectId } = require("mongodb");

exports.createUser = async (req, res) => {
 const client = await mongoClient();
  const userCollection = client.db("userDetailsDB").collection("userDetails");
  try {
    //db.collection
    const acknowledge = await userCollection.insertOne(req.body);
    res.status(201).json({
      status: "success",
      data: acknowledge.ops[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  } finally {
    client.close();
  }
};
exports.getUser = async (req, res) => {
 const client = await mongoClient();
  const userCollection = client.db("userDetailsDB").collection("userDetails");
  try {
    const acknowledge = await userCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray();

    res.status(201).json({
      status: "success",
      data: acknowledge,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  } finally {
    client.close();
  }
};
exports.getUsers = async (req, res) => {
  const client = await mongoClient();
  const userCollection = client.db("userDetailsDB").collection("userDetails");
  try {
    const acknowledge = await userCollection.find().toArray();
    res.status(201).json({
      status: "success",
      results: acknowledge.length,
      data: {
        users: acknowledge,
      },
    });
  } catch (err) {
    
    res.status(400).json({
      status: "fail",
      message: err,
    });
  } finally {
    client.close();
  }
};
exports.updateUser = async (req, res) => {
 const client = await mongoClient();
  const userCollection = client.db("userDetailsDB").collection("userDetails");
  try {
    const acknowledge = await userCollection.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(201).json({
      status: "successful",
      data: acknowledge,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  } finally {
    client.close();
  }
};
exports.deleteUser = async (req, res) => {
 const client = await mongoClient();
  const userCollection = client.db("userDetailsDB").collection("userDetails");
  try {
    const acknowledge = await userCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(201).json({
      status: "successful",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  } finally {
    client.close();
  }
};
