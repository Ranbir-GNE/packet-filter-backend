const db = require("../utils/dbConnect"); // Import the promise-based database connection
const bcrypt = require("bcrypt");

//Fetch User Rules
const getUserRules = async (req, res) => {
  const { userId } = req.params;
  

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT b.domain
      FROM clients_table c
      JOIN blocked_websites b ON c.user_id = b.user_id
      WHERE c.user_id = ?
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No blocked domains found for this user." });
    }

    const blockedDomains = rows.map(row => row.domain);
    res.json({ userId, blockedDomains });

  } catch (error) {
    console.error("Error fetching blocked domains:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//Delete User Rule
const deleteUserRule = async (req, res) => {
  const { userId, blockedDomain	 } = req.body;
  if (!userId || !blockedDomain)
    return res.status(400).json({ message: "Missing userId or blockedDomain" });

  try {
    const [result] = await db.query(
      "DELETE FROM blocked_websites WHERE user_id = ? AND domain = ?",
      [userId, blockedDomain]
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
  const { userId, domain } = req.body;
  if (!userId || !domain) {
    return res.status(400).json({ message: "Missing username or domain" });
  }

  try {
    
    // 2. Check if the domain is already blocked for this user
    const [existing] = await db.query(
      "SELECT * FROM blocked_websites WHERE user_id = ? AND domain = ?",
      [userId, domain]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Domain already blocked for this user" });
    }

    // 3. Insert into blocked_websites
    await db.query(
      "INSERT INTO blocked_websites (user_id, domain) VALUES (?, ?)",
      [userId, domain]
    );

    res.status(201).json({ message: "Domain blocked successfully" });

  } catch (error) {
    console.error("Error blocking domain:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getUserRules,
  deleteUserRule,
  addUserRule,
}