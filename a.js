const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// This variable is the "Waiting Room"
let pendingJob = null;

// 🌐 1. WEBSITE CALLS THIS
// When you click the button on Vercel, it runs this and "saves" the data.
app.get('/trigger-print', (req, res) => {
    pendingJob = {
        storeName: "MITER CLOUD SHOP",
        receiptId: "ABC-" + Math.floor(Math.random() * 1000),
        customer: "Website Customer",
        items: [
            { name: "Website Item A", price: "50.00" },
            { name: "Service Fee", price: "5.00" }
        ],
        total: "55.00"
    };
    console.log("Print job queued from Website!");
    res.json({ success: true, message: "Job is now waiting for the app" });
});

// 📱 2. MOBILE APP CALLS THIS (Every 3 seconds)
app.get('/print-job', (req, res) => {
    if (pendingJob) {
        console.log("Sending job to Phone App...");
        const dataToSend = pendingJob;
        pendingJob = null; // 🚨 CLEAR the job so it doesn't print again
        res.json(dataToSend);
    } else {
        res.status(404).json({ message: "No data" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
});
