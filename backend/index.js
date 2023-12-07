const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  try {
    const { expoPushToken, title, body } = req.body;

    const response = await axios.post(
      'https://exp.host/--/api/v2/push/send',
      {
        to: expoPushToken,
        title,
        body,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    console.log('Expo Push notification sent:', response.data);
    res.json({ success: true, expoResponse: response.data });
  } catch (error) {
    console.error('Error sending Expo Push notification:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
