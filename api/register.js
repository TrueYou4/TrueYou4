export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // You can save this email to a database, a file, or a service like Notion, Airtable, etc.
    // For now, just simulate success:
    console.log('New interest registered:', email);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registering interest:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
