import nodemailer from "nodemailer";

export default async function contattiMailer(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const { name, surname, email, apartment, subject, message } = req.body;

  if (!name || !surname || !email || !apartment || !subject || !message) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.it", // aggiorna se usi altro provider
    port: 465,
    secure: true,
    auth: {
      user: "info@thallion-dev.it", // tua email
      pass: "Sari_male84?!?", // password
    },
  });

  const emailHtml = `
  <html lang="it">
    <body>
      <h2>Nuovo messaggio dal form contatti</h2>
      <p><strong>Nome:</strong> ${name} ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Appartamento:</strong> ${apartment}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Messaggio:</strong><br>${message}</p>
    </body>
  </html>
  `;

  const thankHtml = `
  <html lang="it">
    <body>
      <h2>Grazie per averci contattato, ${name}!</h2>
      <p>Abbiamo ricevuto il tuo messaggio riguardo <strong>${subject}</strong>.</p>
      <p>Ti risponderemo al più presto all'indirizzo <strong>${email}</strong>.</p>
      <p>Saluti,<br>Il team</p>
    </body>
  </html>
  `;

  try {
    // Email a te (o al team)
    await transporter.sendMail({
      from: `"Modulo Contatti" <info@thallion-dev.it>`,
      to: ["fcantale14@gmail.com", "agriturismosegarelli@gmail.com"],
      subject: `Nuovo messaggio: ${subject}`,
      replyTo: email,
      html: emailHtml,
    });

    // Email di conferma all’utente
    if (email) {
      await transporter.sendMail({
        from: `"Modulo Contatti" <info@thallion-dev.it>`,
        to: email,
        subject: "Conferma ricezione messaggio",
        html: thankHtml,
      });
    }

    return res.status(200).json({ message: "Email inviata con successo" });
  } catch (error) {
    console.error("Errore invio email:", error);
    return res
      .status(500)
      .json({ error: error.message || "Errore nell'invio dell'email" });
  }
}
