import nodemailer from "nodemailer";

export default async function bookingMailer(req, res) {
  const {
    firstName,
    lastName,
    phone,
    checkIn,
    checkOut,
    adults,
    children,
    notes,
    email,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.it",
    port: 465,
    secure: true,
    auth: {
      user: "info@thallion-dev.it",
      pass: "Sari_male84?!?",
    },
  });

  const emailHtml = `
  <html lang="it">
    <body>
      <h2>Nuova prenotazione</h2>
      <p><strong>Nome:</strong> ${firstName} ${lastName}</p>
      <p><strong>Telefono:</strong> ${phone}</p>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
      <p><strong>Adulti:</strong> ${adults}</p>
      <p><strong>Bambini:</strong> ${children}</p>
      <p><strong>Note:</strong> ${notes || "Nessuna"}</p>
    </body>
  </html>
`;

  const thankHtml = `
  <html lang="it">
    <body>
      <h2>Grazie per la tua prenotazione, ${firstName}!</h2>
      <p>Abbiamo ricevuto la tua richiesta per il periodo dal <strong>${checkIn}</strong> al <strong>${checkOut}</strong>.</p>
      <p>Ti contatteremo a breve al numero <strong>${phone}</strong> per confermare la prenotazione.</p>
      <p>Saluti,<br>Il team</p>
    </body>
  </html>
`;

  try {
    // Email a te
    await transporter.sendMail({
      from: `"Booking Form" <info@thallion-dev.it>`,
      to: ["fcantale14@gmail.com", "agriturismosegarelli@gmail.com"],
      subject: `Nuova prenotazione dal ${checkIn} al ${checkOut}`,
      replyTo: email,
      html: emailHtml,
    });

    // Email all’utente
    if (email) {
      await transporter.sendMail({
        from: `"Booking Form" <info@thallion-dev.it>`,
        to: email,
        subject: "Conferma prenotazione",
        html: thankHtml,
      });
    }

    return res.status(200).json({ message: "Email inviata con successo" });
  } catch (error) {
    console.error("Errore nell'invio dell'email:", error);
    return res
      .status(500)
      .json({ error: error.message || "Errore nell'invio dell'email" });
  }
}
