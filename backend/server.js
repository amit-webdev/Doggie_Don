import dotenv from 'dotenv';
import app from './app.js';
import Razorpay from 'razorpay';

dotenv.config();

const port = process.env.PORT || 3000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
