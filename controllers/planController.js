const db = require("../utils/dbConnect");
const generateRandom = require("../utils/helpingFunction");

const addPlans = async (req, res) => {
    const { user_id, rule_id } = req.body;

    // Validate input
    if (!user_id || !rule_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user_id exists
        const userCheckQuery = `SELECT * FROM clients_table WHERE user_id = ?`;
        const [user] = await db.query(userCheckQuery, [user_id]);
        if (!user) {
            return res.status(404).json({ message: "User ID not found" });
        }

        // Check if rule_id exists
        const ruleCheckQuery = `SELECT * FROM rules_table WHERE rule_id = ?`;
        const [rule] = await db.query(ruleCheckQuery, [rule_id]);
        if (!rule) {
            return res.status(404).json({ message: "Rule ID not found" });
        }

        // Check if the user already has the rule assigned
        const existingPlanQuery = `SELECT * FROM plans_table WHERE user_id = ? AND rule_id = ?`;
        const [existingPlan] = await db.query(existingPlanQuery, [user_id, rule_id]);
        if (existingPlan.length > 0) {
            return res.status(400).json({ message: "Cannot assign a rule to a user multiple times" });
        }

        const plan_id = generateRandom();
        const query = `INSERT INTO plans_table (plan_id, user_id, rule_id) VALUES (?, ?, ?)`;
        const values = [plan_id, user_id, rule_id];

        await db.query(query, values);

        res.status(201).json({ message: "Plan added successfully" });
    } catch (error) {
        console.error("Error adding plan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllPlans = async (req, res) => {
    try {
        const query = `SELECT * FROM plans_table`;
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No plans found" });
        }
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deletePlans = async (req, res) => {
    const { plan_id } = req.params;

    // Validate input
    if (!plan_id) {
        return res.status(400).json({ message: "Plan ID is required" });
    }

    try {
        // Check if plan_id exists
        const planCheckQuery = `SELECT * FROM plans_table WHERE plan_id = ?`;
        const [plan] = await db.query(planCheckQuery, [plan_id]);
        if (!plan) {
            return res.status(404).json({ message: "Plan ID not found" });
        }

        // Delete the plan
        const query = `DELETE FROM plans_table WHERE plan_id = ?`;
        await db.query(query, [plan_id]);

        res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
        console.error("Error deleting plan:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addPlans,
    getAllPlans, deletePlans
}