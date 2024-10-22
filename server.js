const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/api/predict-timeline', async (req, res) => {
    const { case_no, type_name, desgcode, district_code, state_code } = req.body;

    try {
        const response = await fetch('http://localhost:5001/predict-timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ case_no, type_name, desgcode, district_code, state_code })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
