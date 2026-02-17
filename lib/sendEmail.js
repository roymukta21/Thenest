import nodemailer from "nodemailer";

const sendInvoice = async (email, booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Care.xyz",
    to: email,
    subject: "Booking Invoice",
    html: `
      <h2>Booking Confirmed</h2>
      <p>Service: ${booking.serviceName}</p>
      <p>Total: ৳${booking.totalCost}</p>
    `,
  });
};

export default sendInvoice;
