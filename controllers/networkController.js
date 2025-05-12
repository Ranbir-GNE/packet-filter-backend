const db = require("../utils/dbConnect"); // Import the promise-based database connection

// Controller for fetching bytes usage
const getBytesUsage = async (req, res) => {
  const query = "SELECT * FROM bytes_usage WHERE hostname!=' '";
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
};

// Controller for fetching total bytes by source_ip
const getTotalBytes = async (req, res) => {
  const query = `
    SELECT 
      source_ip, 
      SUM(downloaded) AS total_downloaded, 
      SUM(uploaded) AS total_uploaded 
    FROM bytes_usage 
    GROUP BY source_ip
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching total bytes data:", err);
    res.status(500).send("Error fetching total bytes data");
  }
};

// Controller for fetching total bytes by hostname
const getTotalBytesByHostname = async (req, res) => {
  const query = `
    SELECT 
      hostname, 
      SUM(downloaded) AS total_downloaded, 
      SUM(uploaded) AS total_uploaded 
    FROM bytes_usage WHERE hostname!=' '
    GROUP BY hostname
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching total bytes data by hostname:", err);
    res.status(500).send("Error fetching total bytes data by hostname");
  }
};

// Controller for fetching all entries
const getAllEntries = async (req, res) => {
  const query = `
    SELECT 
      source_ip, 
      hostname, 
      downloaded, 
      uploaded, 
      date 
    FROM bytes_usage
  `;
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error("Error fetching all entries:", err);
    res.status(500).send("Error fetching all entries");
  }
};

module.exports = {
  getBytesUsage,
  getTotalBytes,
  getTotalBytesByHostname,
  getAllEntries,
};
