const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let appQueue = null; // The "Waiting Room" for the Mobile App

// 🌐 A. Website calls this to get data from your DB
app.get('/get-db-data', (req, res) => {
    // Simulating your DB fetch
    const dbData = {
        storeName: "MITER SHOP",
        receiptId: "DB-" + Math.floor(Math.random() * 1000),
        items: [{ name: "Database Item", price: "500" }],
        total: "500"
    };
    res.json(dbData);
});

// 🌐 B. Website calls this to push that data to the App
app.post('/push-to-app', (req, res) => {
    appQueue = req.body; 
    res.json({ success: true });
});

// 📱 C. Mobile App calls this to see if Website sent something
app.get('/fetch-for-app', (req, res) => {
    if (appQueue) {
        const data = appQueue;
        appQueue = null; // Clear it
        res.json(data);
    } else {
        res.status(404).send();
    }
});

app.listen(process.env.PORT || 3000, '0.0.0.0');
