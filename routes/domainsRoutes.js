const { addDomains,
    getDomainsForRule } = require('../controllers/blockedDomainsController');
const express = require("express");
const router = express.Router();

router.post("/add/:rule_id", addDomains);
router.get("/get/:rule_id", getDomainsForRule);

module.exports = router;