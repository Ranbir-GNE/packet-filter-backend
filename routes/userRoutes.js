const express = require("express");
const {
    userLogin,
    newUser,
    getUserData,
    getAllUsers,
} = require("../controllers/userController");
const router = express.Router();
router.post("/login", userLogin);
router.post("/register", newUser);
router.get("/:userId", getUserData);
router.get("/users", getAllUsers);

module.exports = router;