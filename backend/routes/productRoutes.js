import express from  'express';
import { getkey, paymentProcess } from '../controllers/productController.js';
const router=express.Router();

router.route('/payment/process').post(paymentProcess);
router.route("/getkey").get(getkey);

export default router;