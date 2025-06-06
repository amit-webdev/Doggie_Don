import { instance } from "../server.js";

export const paymentProcess=async(req,res)=>{

  const options={
    amount:Number(req.body.amount*100),
    currency:"INR"
  }

  const order=await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order
  });
}

export const getkey=async(req,res)=>{
  res.status(200).json({
    key:process.env.Razorpay_KEY_ID
  })
}