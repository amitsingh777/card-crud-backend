const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.use((req, res, next) => {
  console.log("test");
  next();
});

router.route("/").get(userController.getUsers).post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
