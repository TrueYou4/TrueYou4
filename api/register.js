// /api/register.js
// File: /api/register.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Invalid email' });
  }

  try {
    await resend.emails.send({
      from: 'TrueYou <hello@yourdomain.com>',
      to: 'you@yourdomain.com', // or the user if you're confirming their signup
      subject: 'New Interest Signup',
      text: `New signup: ${email}`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
