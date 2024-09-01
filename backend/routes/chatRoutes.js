const express = require("express");
//Imports the Express framework to create a router.
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
//Imports various controller functions from chatControllers which handle the business logic for chat operations.
const { protect } = require("../middleware/authMiddleware");
//Imports the protect middleware from authMiddleware, which is used to protect routes
// by ensuring the user is authenticated.

const router = express.Router();
//Creates a new instance of an Express router.

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
