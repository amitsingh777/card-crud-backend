const client = require("../mongoClient");
const { ObjectId } = require("mongodb");
const connection = async () => {
  await client.connect();
  const userDB = client.db("userDetailsDB");
  const userCollection = userDB.collection("userDetails");
  return userCollection;
};
exports.createUser = async (req, res) => {
  try {
    const userCollection = await connection();
    const acknowledge = await userCollection.insertOne(req.body);
    res.status(201).json({
      status: "success",
      data: acknowledge,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  } finally {
    await client.close();
  }
};
exports.getUser = async (req, res) => {
  try {
    const userCollection = await connection();
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
    await client.close();
  }
};
exports.getUsers = async (req, res) => {
  try {
    const userCollection = await connection();
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
    await client.close();
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userCollection = await connection();
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
    await client.close();
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userCollection = await connection();
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
    await client.close();
  }
};
