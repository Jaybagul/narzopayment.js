import React, { useState } from "react";
import axios from "axios"; // API requests ke liye Axios import karte hain

const App = () => {
  // State to store payment amount
  const [amount, setAmount] = useState("");

  // Payment handle karne ka function
  const handlePayment = async () => {
    // Check if amount is entered
    if (!amount) {
      alert("Kripya ek amount daaliye!"); // Agar amount na ho to alert dikhayein
      return;
    }

    try {
      // Backend ko request bhejte hain order create karne ke liye
      const response = await axios.post("http://localhost:5000/create-order", {
        amount, // Backend ko amount bhejte hain
      });

      // Backend se order details lete hain
      const { id: order_id, amount: order_amount, currency } = response.data;

      // Razorpay ke payment options set karte hain
      const options = {
        key: "YOUR_KEY_ID", // Razorpay ka key ID
        amount: order_amount, // Backend se aaya order ka amount
        currency: currency, // Backend se aaya currency
        name: "Meri Company", // Payment popup ka title
        description: "Test Payment", // Payment popup ka description
        order_id: order_id, // Backend se aaya order ID
        handler: function (response) {
          // Payment successful hone par kaam karna
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        theme: {
          color: "#3399cc", // Popup ka theme color
        },
      };

      // Razorpay ka checkout open karte hain
      const razorpay = new window.Razorpay(options);
      razorpay.open(); // Popup open hoga
    } catch (error) {
      console.error("Payment error:", error);
      alert("Kuch galat ho gaya!"); // Error ke case me alert
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Razorpay Payment Integration</h1>
      {/* Input box to enter amount */}
      <input
        type="number"
        placeholder="Amount daaliye"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // State update karte hain
        style={{ padding: "10px", width: "200px", margin: "10px 0" }}
      />
      {/* Button to trigger payment */}
      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3399cc",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default App;
