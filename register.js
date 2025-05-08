// api/register.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { email } = req.body;
  const apiKey = process.env.BREVO_API_KEY;
  const listId = 7;

  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true
      })
    });

    const data = await response.json();

    if (!response.ok) return res.status(response.status).json({ error: data });

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
