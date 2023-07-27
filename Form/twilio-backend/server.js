const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Twilio credentials (replace with your own)
const accountSid = 'ACa5a533337f4deb14299ba37e3fa27bfc';
const authToken = '471f984470f161c034122ccc2c0e4725';
const twilioNumber = '+14323563233';

// Twilio client instance
const client = twilio(accountSid, authToken);

// API endpoint to send SMS
app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: phoneNumber,
    })
    .then((message) => {
      console.log(`SMS sent with SID: ${message.sid}`);
      res.json({ success: true });
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ error: 'Failed to send SMS' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
