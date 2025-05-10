const db = require("../utils/dbConnect");
const generateRandom = require("../utils/helpingFunction");

const addDomains = async (req, res) => {
    const rule_id = req.params.rule_id;
    const { domain } = req.body;

    // Validate input
    if (!domain || !rule_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if rule_id exists 
        const ruleCheckQuery = `SELECT * FROM rules_table WHERE rule_id = ?`;
        const [rule] = await db.query(ruleCheckQuery, [rule_id]);

        if (!rule) {
            return res.status(404).json({ message: "Rule ID not found" });
        }

        // Insert new domain 
        const query = `INSERT INTO blocked_websites (rule_id, domain) VALUES (?, ?)`;
        const values = [rule_id, domain];

        await db.query(query, values);

        res.status(201).json({ message: "Domain added successfully" });
    } catch (error) {
        console.error("Error adding domain:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getDomainsForRule = async (req, res) => {
    const rule_id = req.params.rule_id;

    // Validate input
    if (!rule_id) {
        return res.status(400).json({ message: "Rule ID is required" });
    }

    try {
        // Check if rule_id exists 
        const ruleCheckQuery = `SELECT * FROM rules_table WHERE rule_id = ?`;
        const [rule] = await db.query(ruleCheckQuery, [rule_id]);

        if (!rule) {
            return res.status(404).json({ message: "Rule ID not found" });
        }

        // Fetch domains for rule_id
        const query = `SELECT * FROM blocked_websites WHERE rule_id = ?`;
        const [rows] = await db.query(query, [rule_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No domains found for this rule" });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching domains:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addDomains,
    getDomainsForRule
}