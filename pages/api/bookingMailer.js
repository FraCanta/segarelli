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
	<path fill="#151D25" d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2" />
</svg>
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

<a href="https://segarelli.vercel.app/"
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
