import { Analytics } from "@vercel/analytics/react"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name } = req.body;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: "TrueYou", email: "noreply@trueyou.pro" },
      to: [{ email: "you@trueyou.pro", name: "Admin" }],
      subject: "🎉 New User Registered!",
      htmlContent: `<p><strong>${name}</strong> just registered with <strong>${email}</strong>.</p>`
    })
  });

  if (response.ok) {
    res.status(200).json({ message: "Email sent!" });
  } else {
    res.status(500).json({ message: "Error sending email." });
  }
}
