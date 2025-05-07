const express = require("express");
const cors = require("cors");
const {
  getBytesUsage,
  getTotalBytes,
  getTotalBytesByHostname,
  getAllEntries,
} = require("./controllers/networkController");
const {
  userLogin,
  newUser,
  getUserData,
  getAllUsers,
} = require("./controllers/userController");

const {
  getUserRules,
  deleteUserRule,
  addUserRule,
} = require("./controllers/rulesController");

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/bytes-usage", getBytesUsage);
app.get("/api/total-bytes", getTotalBytes);
app.get("/api/total-bytes-hostname", getTotalBytesByHostname);
app.get("/api/all-entries", getAllEntries);

app.post("/api/login", userLogin);
app.post("/api/register", newUser);
app.get("/api/user/:userId", getUserData);
app.get("/api/users", getAllUsers);

app.get("/api/rules/:userId", getUserRules);
app.post("/api/rules/add", addUserRule);
app.delete("/api/rules/delete", deleteUserRule);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
