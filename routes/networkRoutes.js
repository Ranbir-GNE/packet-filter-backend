const express = require("express");
const { getBytesUsage, getTotalBytes, getTotalBytesByHostname, getAllEntries } = require("../controllers/networkController");
const router = express.Router();

router.get("/bytes-usage", getBytesUsage);
router.get("/total-bytes", getTotalBytes);
router.get("/total-bytes-hostname", getTotalBytesByHostname);
router.get("/all-entries", getAllEntries);

module.exports = router;