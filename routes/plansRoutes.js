const { addPlans,
    getAllPlans, deletePlans } = require("../controllers/planController");
const express = require("express");
const router = express.Router();

router.post("/add", addPlans);
router.get("/get", getAllPlans);
router.delete("/delete/:plan_id", deletePlans);

module.exports = router;