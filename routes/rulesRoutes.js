const express = require("express");
const { createRule,
    getAllRules,
    getUserRules,
    deleteRule } = require("../controllers/rulesController");
const router = express.Router();

router.post("/create", createRule);
router.get("/all", getAllRules);
router.get("/:user_id", getUserRules);
router.delete("/delete/:rule_id", deleteRule);

module.exports = router;