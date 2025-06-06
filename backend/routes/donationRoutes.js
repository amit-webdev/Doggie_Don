// routes/donationRoutes.js
import express from "express";
import { saveDonation } from "../controllers/donationController.js";
import { getDonors } from "../controllers/donationController.js";

const router = express.Router();

router.route('/saveDonation').post(saveDonation);

router.route('/getDonors').get(getDonors);

export default router;
