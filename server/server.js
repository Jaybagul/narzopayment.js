// Express, Razorpay, body-parser, aur cors modules ko import karte hain
const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const cors = require("cors");

// Express app banate hain
const app = express();

// Middleware lagate hain
app.use(bodyParser.json()); // JSON data parse karne ke liye
app.use(cors()); // Cross-Origin Requests allow karne ke liye

// Razorpay instance create karte hain (aapka Razorpay credentials yahan dalen)
const razorpayInstance = new Razorpay({
    key_id: "YOUR_KEY_ID", // Razorpay se mila Key ID
    key_secret: "YOUR_SECRET_KEY", // Razorpay se mila Secret Key
});

// Route to create Razorpay order
app.post("/create-order", async(req, res) => {
    const { amount } = req.body; // Frontend se amount receive karte hain

    const options = {
        amount: amount * 100, // Amount paise me (Rs. 1 = 100 paise)
        currency: "INR", // Currency INR me set karte hain
        receipt: "receipt_order_1", // Order ke liye ek unique receipt ID
    };

    try {
        // Razorpay se order create karte hain
        const order = await razorpayInstance.orders.create(options);

        // Successfully created order ko frontend ko bhejte hain
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order"); // Agar error aaye to error message bhejte hain
    }
});

// Server ko run karte hain
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});