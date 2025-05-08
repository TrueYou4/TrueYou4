// /api/addContact.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email' });
  }

  const API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = parseInt(process.env.BREVO_LIST_ID); // make sure it's a number

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        updateEnabled: true // so it won't fail if contact exists
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: result });
    }

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
