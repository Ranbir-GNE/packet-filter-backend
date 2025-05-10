const db = require("../utils/dbConnect");
const generateRandom = require("../utils/helpingFunction");

//Create Rule
const createRule = async (req, res) => {
  const { rule_name } = req.body;

  // Validate input
  if (!rule_name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const rule_id = generateRandom(7);

    // Insert the new rule into the database
    const query = `INSERT INTO rules_table (rule_id, rule_name) VALUES (?, ?)`;
    const values = [rule_id, rule_name];

    await db.query(query, values);

    res.status(201).json({ message: "Rule created successfully" });
  } catch (error) {
    console.error("Error creating rule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserRules = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const query = `
      SELECT p.plan_id, r.rule_id, r.rule_name
      FROM plans_table p
      JOIN rules_table r ON p.rule_id = r.rule_id
      WHERE p.user_id = ?
    `;
    const [rows] = await db.query(query, [user_id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user rules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all rules
const getAllRules = async (req, res) => {
  try {
    const query = `SELECT * FROM rules_table`;
    const [rows] = await db.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No rules found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching rules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete a rule
const deleteRule = async (req, res) => {
  const { rule_id } = req.params;

  // Validate input
  if (!rule_id) {
    return res.status(400).json({ message: "Rule ID is required" });
  }

  try {
    // Delete the rule from the database
    const query = `DELETE FROM rules_table WHERE rule_id = ?`;
    const values = [rule_id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res.status(200).json({ message: "Rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting rule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRule,
  getAllRules,
  deleteRule, getUserRules
}