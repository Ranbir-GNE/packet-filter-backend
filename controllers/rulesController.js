const db = require("../utils/dbConnect"); // Import the promise-based database connection
const bcrypt = require("bcrypt");

//Fetch User Rules
const getUserRules = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rules] = await db.query(
      "SELECT blocked_ip FROM user_rules WHERE user_id = ?",
      [userId]
    );

    res.status(200).json({ blockedIps: rules.map((r) => r.blocked_ip) });
  } catch (error) {
    console.error("Error fetching rules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete User Rule
const deleteUserRule = async (req, res) => {
  const { userId, blockedIp } = req.body;
  if (!userId || !blockedIp)
    return res.status(400).json({ message: "Missing userId or blockedIp" });

  try {
    const [result] = await db.query(
      "DELETE FROM user_rules WHERE user_id = ? AND blocked_ip = ?",
      [userId, blockedIp]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res.status(200).json({ message: "Rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting rule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Add User Rule
const addUserRule = async (req, res) => {
  const { userId, blockedIp } = req.body;
  if (!userId || !blockedIp)
    return res.status(400).json({ message: "Missing userId or blockedIp" });

  try {
    // Prevent duplicate rule
    const [existing] = await db.query(
      "SELECT * FROM user_rules WHERE user_id = ? AND blocked_ip = ?",
      [userId, blockedIp]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Rule already exists" });
    }

    await db.query(
      "INSERT INTO user_rules (user_id, blocked_ip) VALUES (?, ?)",
      [userId, blockedIp]
    );
    res.status(201).json({ message: "Rule added successfully" });
  } catch (error) {
    console.error("Error adding rule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    getUserRules,
    deleteUserRule,
    addUserRule,
}