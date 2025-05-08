export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name } = req.body;

  if (!email || !name || typeof email !== 'string' || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid request data.' });
  }

  const htmlContent = `<!DOCTYPE html>
  <html>
    <body style="font-family: sans-serif; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
      <h1 style="margin-top: 40px; font-size: 36px; font-weight: bold; color: #1f05b1;">TrueYou</h1>
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
      </main>export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name } = req.body;

  if (!email || !name || typeof email !== 'string' || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid request data.' });
  }

  const htmlContent = `<!DOCTYPE html>
  <html>
    <body style="font-family: sans-serif; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
      <h1 style="margin-top: 40px; font-size: 36px; font-weight: bold; color: #1f05b1;">TrueYou</h1>
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
      // Optionally add replyTo here
    }),
  });

  if (response.ok) {
    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    const error = await response.json();
    return res.status(500).json({ message: "Error sending email.", error });
  }
}
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
      // Optionally add replyTo here
    }),
  });

  if (response.ok) {
    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    const error = await response.json();
    return res.status(500).json({ message: "Error sending email.", error });
  }
}
