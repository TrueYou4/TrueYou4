// /api/register.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  try {
    await resend.emails.send({
      from: 'TrueYou <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to TrueYou!',
      html: `<!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
            <h1 style="color:#4ade80; margin-top: 40px;">TrueYou</h1>
            <main style="padding: 0 20px 40px; font-size: 16px; line-height: 1.6; color: #333;">
              <p style="max-width: 600px; margin: 0 auto;">
                Thank you for registering your interest in <strong>TrueYou</strong>.
              </p>
              <p style="max-width: 600px; margin: 20px auto;">
                You've been successfully added to our early access list.
              </p>
              <p style="max-width: 600px; margin: 20px auto;">
                We can’t wait to show you what’s coming.
              </p>
              <p style="max-width: 600px; margin: 40px auto 0; font-size: 14px; color: #888;">
                ~ The TrueYou Team
              </p>
            </main>
          </body>
        </html>`
    });

    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
}
