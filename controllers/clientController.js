const db = require("../utils/dbConnect");
const generateRandom = require("../utils/helpingFunction");

const addClient = async (req, res) => {
    const { name, ip_address } = req.body;

    // Validate input
    if (!name || !ip_address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user_id = generateRandom();

        // Insert new client
        const query = `INSERT INTO clients_table (user_id, name, ip_address) VALUES (?, ?, ?)`;
        const values = [user_id, name, ip_address];

        await db.query(query, values);

        res.status(201).json({ message: "Client added successfully" });
    } catch (error) {
        console.error("Error adding client:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllClients = async (_, res) => {
    try {
        const query = `SELECT * FROM clients_table`;
        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    addClient,
    getAllClients
}
