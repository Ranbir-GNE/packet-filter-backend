const express = require("express");
const {
    userLogin,
    newUser,
    getUserData,
    getAllUsers,
} = require("../controllers/userController");
const router = express.Router();

router.post("/api/login", userLogin);
router.post("/api/register", newUser);
router.get("/api/user/:userId", getUserData);
router.get("/api/users", getAllUsers);

module.exports = router;