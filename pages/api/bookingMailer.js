import nodemailer from "nodemailer";

export default async function bookingMailer(req, res) {
  const {
    firstName,
    phone,
    checkIn,
    checkOut,
    adults,
    children,
    notes,
    email,
    lang,
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
<body style="margin:0;padding:0;background:#f8f6ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<span style="display:none;max-height:0;overflow:hidden;">
Nuova richiesta di soggiorno ricevuta
</span>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="height:6px;background:#5F6738;"></td>
</tr>

<tr>
<td align="center" style="padding:30px 40px 10px 40px;">
<img src="https://segarelli.vercel.app/assets/logo_segarelli.svg" style="height:55px;">
</td>
</tr>

<tr>
<td align="center" style="padding:10px 40px 20px 40px;">
<h2 style="margin:0;color:#151D25;font-size:24px;">
Nuova prenotazione da ${firstName}
</h2>

<p style="color:#8F8F8F;font-size:16px;margin-top:10px;">
Ecco i dettagli della richiesta ricevuta.
</p>
</td>
</tr>

<tr>
<td style="padding:0 40px;">

<table width="100%" style="background:#f8f6ec;border-radius:10px;padding:24px;">

<tr>
<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-IN</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkIn}</div>
</td>

<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-OUT</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkOut}</div>
</td>
</tr>

<tr>
<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">OSPITI</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">
${adults} adulti ${children ? `• ${children} bambini` : ""}
</div>
</td>

<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">TELEFONO</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${phone}</div>
</td>
</tr>

<tr>
<td colspan="2" style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">EMAIL</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${email}</div>
</td>
</tr>

<tr>
<td colspan="2" style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">NOTE</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${notes || "Nessuna"}</div>
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="padding:25px 40px;color:#151D25;font-size:15px;line-height:1.6;">
<p>
Questa email è stata inviata automaticamente. Controlla i dettagli e contatta il cliente per confermare la disponibilità.
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>

</body>
</html>
`;

  const thankHtml =
    lang === "it"
      ? `
<html lang="it">
<body style="margin:0;padding:0;background:#f8f6ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<span style="display:none;max-height:0;overflow:hidden;">
Richiesta di soggiorno ricevuta - Agriturismo Segarelli
</span>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 20px;">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="height:6px;background:#5F6738;"></td>
</tr>



<tr>
<td align="center" style="padding:30px 40px 10px 40px;">
<img src="https://segarelli.vercel.app/assets/logo_segarelli.svg"
style="height:55px;">
</td>
</tr>

<tr>
<td align="center" style="padding:10px 40px 20px 40px;">
<h2 style="margin:0;color:#151D25;font-size:24px;">
Grazie per averci contattato, <br/>${firstName}
</h2>

<p style="color:#8F8F8F;font-size:16px;margin-top:10px;">
Abbiamo ricevuto la tua richiesta di soggiorno.
</p>
</td>
</tr>

<tr>
<td style="padding:0 40px;">

<table width="100%" style="background:#f8f6ec;border-radius:10px;padding:24px;">

<tr>
<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-IN</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkIn}</div>
</td>

<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-OUT</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkOut}</div>
</td>
</tr>

<tr>
<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">OSPITI</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">
${adults} adulti ${children ? `• ${children} bambini` : ""}
</div>
</td>

<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">TELEFONO</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${phone}</div>
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="padding:25px 40px;color:#151D25;font-size:15px;line-height:1.6;">

<p>
Il nostro staff controllerà la disponibilità per le date richieste e ti contatterà a breve per confermare la prenotazione.
</p>

<p>
Grazie per aver scelto <strong>Agriturismo Segarelli</strong>.  
Speriamo di accoglierti presto per un soggiorno tra natura, relax e tradizione.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:0 40px 30px 40px;">

<a href="https://segarelli.vercel.app/"
style="display:inline-block;padding:14px 32px;background:#BF7116;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;text-transform:uppercase;font-size:14px;">
Visita il sito
</a>

</td>
</tr>

<tr>
<td style="border-top:1px solid #eee;padding:25px 40px;text-align:center;">

<p style="margin:0;color:#8F8F8F;font-size:14px;">
Agriturismo Segarelli
</p>

<p style="margin:6px 0;color:#8F8F8F;font-size:14px;">
Via Podere Segarelli n°6, 56045 Pomarance – Pisa (Italy)
</p>

<p style="margin:0;color:#8F8F8F;font-size:14px;">
agriturismosegarelli@gmail.com
</p>

<!-- Icone social -->
<table align="center" style="margin-top:10px;">
<tr>
<td style="padding:0 5px;">
<a href="https://www.facebook.com/Segarelli" target="_blank">
<img src="https://segarelli.vercel.app/assets/facebook.png" width="24" height="24" alt="Facebook">
</a>
</td>
<td style="padding:0 5px;">
<a href="https://www.instagram.com/agriturismo_segarelli/" target="_blank">
<img src="https://segarelli.vercel.app/assets/instagram.png" width="24" height="24" alt="Instagram">
</a>
</td>

<td style="padding:0 5px;">
<a href="https://www.tripadvisor.it/Hotel_Review-g776018-d2063072-Reviews-Agriturismo_Segarelli-Pomarance_Province_of_Pisa_Tuscany.html" target="_blank">
<img src="https://segarelli.vercel.app/assets/tripadvisor.png" width="24" height="24" alt="TripAdvisor">
</a>
</td>
</tr>
</table>

</td>
</tr>

</body>
</html>
`
      : `
<html lang="en">
<body style="margin:0;padding:0;background:#f8f6ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<span style="display:none;max-height:0;overflow:hidden;">
Your stay request at Agriturismo Segarelli has been received
</span>

<table width="100%">
<tr>
<td align="center" style="padding:40px 20px;">

<table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="height:6px;background:#5F6738;"></td>
</tr>



<tr>
<td align="center" style="padding:30px 40px 10px 40px;">
<img src="https://segarelli.vercel.app/assets/logo_segarelli.svg"
style="height:55px;">
</td>
</tr>

<tr>
<td align="center" style="padding:10px 40px 20px 40px;">
<h2 style="margin:0;color:#151D25;font-size:24px;">
Thank you for contacting us,<br/> ${firstName}
</h2>

<p style="color:#8F8F8F;font-size:16px;margin-top:10px;">
We have received your stay request.
</p>
</td>
</tr>

<tr>
<td style="padding:0 40px;">

<table width="100%" style="background:#f8f6ec;border-radius:10px;padding:24px;">

<tr>
<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-IN</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkIn}</div>
</td>

<td width="50%">
<div style="font-size:12px;color:#8F8F8F;">CHECK-OUT</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${checkOut}</div>
</td>
</tr>

<tr>
<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">GUESTS</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">
${adults} adults ${children ? `• ${children} children` : ""}
</div>
</td>

<td style="padding-top:15px;">
<div style="font-size:12px;color:#8F8F8F;">PHONE</div>
<div style="font-size:17px;color:#151D25;font-weight:600;">${phone}</div>
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="padding:25px 40px;color:#151D25;font-size:15px;line-height:1.6;">

<p>
Our team will check availability and contact you shortly to confirm your booking.
</p>

<p>
Thank you for choosing <strong>Agriturismo Segarelli</strong>.  
We look forward to welcoming you for a relaxing stay surrounded by nature.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:0 40px 30px 40px;">

<a href="https://segarelli.vercel.app/en"
style="display:inline-block;padding:14px 32px;background:#BF7116;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;text-transform:uppercase;font-size:14px;">
Visit our website
</a>

</td>
</tr>

<tr>
<td style="border-top:1px solid #eee;padding:25px 40px;text-align:center;">

<p style="margin:0;color:#8F8F8F;font-size:14px;">
Agriturismo Segarelli
</p>

<p style="margin:6px 0;color:#8F8F8F;font-size:14px;">
Via Podere Segarelli n°6, 56045 Pomarance – Pisa (Italy)
</p>

<p style="margin:0;color:#8F8F8F;font-size:14px;">
agriturismosegarelli@gmail.com
</p>

<!-- Icone social -->
<table align="center" style="margin-top:10px;">
<tr>
<td style="padding:0 5px;">
<a href="https://www.facebook.com/Segarelli" target="_blank">
<img src="https://segarelli.vercel.app/assets/facebook.png" width="24" height="24" alt="Facebook">
</a>
</td>
<td style="padding:0 5px;">
<a href="https://www.instagram.com/agriturismo_segarelli/" target="_blank">
<img src="https://segarelli.vercel.app/assets/instagram.png" width="24" height="24" alt="Instagram">
</a>
</td>
<td style="padding:0 5px;">
<a href="https://www.tripadvisor.it/Hotel_Review-g776018-d2063072-Reviews-Agriturismo_Segarelli-Pomarance_Province_of_Pisa_Tuscany.html" target="_blank">
<img src="https://segarelli.vercel.app/assets/tripadvisor.png" width="24" height="24" alt="TripAdvisor">
</a>
</td>
</tr>
</table>

</td>
</tr>

</body>
</html>
`;

  try {
    // Email a te
    await transporter.sendMail({
      from: `"Richiesta prenotazione" <info@thallion-dev.it>`,
      to: ["fcantale14@gmail.com"],
      subject: `Nuova richiesta prenotazione dal ${checkIn} al ${checkOut}`,
      replyTo: email,
      html: emailHtml,
    });

    // Email all’utente
    if (email) {
      await transporter.sendMail({
        from: `"Agriturismo Segarelli" <info@thallion-dev.it>`,
        to: email,
        subject:
          lang === "it" ? "Richiesta di prenotazione" : "Booking Request",
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
