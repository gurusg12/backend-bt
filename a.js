const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
const cors = require('cors');
app.use(cors()); // This allows Vercel to talk to Render

// This is the data the printer will fetch
app.get('/print-job', (req, res) => {
    console.log("Printer is requesting data...");
    res.json({
        storeName: "MITER LOCAL SHOP",
        receiptId: "ABC-" + Math.floor(Math.random() * 1000),
        customer: "Walking Customer",
        items: [
            { name: "gurusg", price: "15.00" },
            { name: "Local Item B", price: "25.00" },
            { name: "Service Fee", price: "5.00" }
        ],
        total: "45.00"
    });
});

// Use 0.0.0.0 to allow connections from other devices on the same Wi-Fi
app.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------`);
    console.log(`Backend is running!`);
    console.log(`IMPORTANT: In your App.js, use the URL:`);
    console.log(`http://YOUR_COMPUTER_IP:${PORT}/print-job`);
    console.log(`-----------------------------------------`);
});