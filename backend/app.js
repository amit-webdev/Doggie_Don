// app.js or server.js (ES Modules version)

import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";

import paymentRoutes from "./routes/productRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import { getDonors } from "./controllers/donationController.js";

const app = express();

// Middleware
app.use(cors());
// app.use(bodyParser.json()); // or app.use(express.json()); (you can choose one)
app.use(express.json()); 

// Routes
app.use("/api", paymentRoutes);
app.use("/api", donationRoutes);

app.use("/api", getDonors)

// Export app
export default app;
