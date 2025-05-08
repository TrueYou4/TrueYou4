
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name } = req.body;

  const htmlContent = `<!DOCTYPE html>
  <html>
    <body style="font-family: sans-serif; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
      <style>
        .gradient-text {
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(90deg, #1f05b1, #7873f5, #4ade80, #05e0c3);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: wave 6s ease-in-out infinite;
        }

        @keyframes wave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>

      <h1 class="gradient-text" style="margin-top: 40px;">TrueYou</h1>

      <main style="padding: 0 20px 40px; font-size: 16px; line-height: 1.6; color: #333;">
        <p style="max-width: 600px; margin: 0 auto;">
          Thank you for registering your interest in <strong>TrueYou</strong>.
        </p>
        <p style="max-width: 600px; margin: 20px auto;">
          You've been successfully added to our early access list. We'll be in touch soon with important updates as we prepare to launch something truly special.
        </p>
        <p style="max-width: 600px; margin: 20px auto;">
          In the meantime, stay connected and follow our journey. We can’t wait to show you what’s coming.
        </p>
        <p style="max-width: 600px; margin: 40px auto 0; font-size: 14px; color: #888;">
          ~ The TrueYou Team
        </p>
      </main>
    </body>
  </html>`;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "TrueYou", email: "trueyoupro@gmail.com" },
      to: [{ email: email, name: name }],
      subject: "Thanks for Registering Interest!",
      htmlContent: htmlContent,
    }),
  });

  if (response.ok) {
    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    const error = await response.json();
    return res.status(500).json({ message: "Error sending email.", error });
  }
}
