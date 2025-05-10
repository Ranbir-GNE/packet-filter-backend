const { addClient,
    getAllClients
} = require("../controllers/clientController");
const express = require("express");
const router = express.Router();

router.post("/add", addClient);
router.get("/all", getAllClients);

module.exports = router;