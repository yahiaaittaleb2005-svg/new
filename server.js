import express from "express";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

const stripe = new Stripe(process.env.STRIPE_KEY);

app.post("/checkout", async (req,res)=>{
  const items = req.body.items;

  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items: items.map(i=>({
      price_data:{
        currency:"eur",
        product_data:{ name:i.name },
        unit_amount:i.price*100
      },
      quantity:1
    })),
    mode:"payment",
    success_url:"https://TUO-SITO.onrender.com/success.html",
    cancel_url:"https://TUO-SITO.onrender.com/cancel.html"
  });

  res.json({url:session.url});
});

app.listen(3000, ()=> console.log("HalalHub online"));
