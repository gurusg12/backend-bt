// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Critical for React JS to talk to Render
app.use(express.json());

app.get('/get-latest-order', (req, res) => {
    // This is the data structure the App expects
    const orderData = {
        storeName: "Meter App from Nimagagi",
        total: "1250.00",
        items: [
            { name: "Product 1", price: "5000" },
            { name: "Product B", price: "750.00" }
        ]
    };
    
    // Explicitly send as JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(orderData);
});

app.listen(process.env.PORT || 3000, '0.0.0.0');
