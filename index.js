const express = require("express");
const cors = require("cors");

const PORT = 5000;
const app = express();
app.use(cors({
  origin: 'https://firewall.net'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loggerMiddleware = require("./utils/logger");

const userRoutes = require("./routes/userRoutes");
const networkRoutes = require("./routes/networkRoutes");
const rulesRoutes = require("./routes/rulesRoutes");
const clientRoutes = require("./routes/clientRoutes");
const planRoutes = require("./routes/plansRoutes");
const blockedDomainsRoutes = require("./routes/domainsRoutes");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on("error", (error) => {
  console.error(error);
});

app.use("/api/users", loggerMiddleware, userRoutes);
app.use("/api/network", loggerMiddleware, networkRoutes);
app.use("/api/rules", loggerMiddleware, rulesRoutes);
app.use("/api/clients", loggerMiddleware, clientRoutes);
app.use("/api/plans", loggerMiddleware, planRoutes);
app.use("/api/blocked-domains", loggerMiddleware, blockedDomainsRoutes);
