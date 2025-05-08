
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const LIST_ID = Number(process.env.BREVO_LIST_ID);

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Invalid email' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        updateEnabled: true
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ success: false, error: data });
    }

  } catch (err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
