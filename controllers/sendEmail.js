import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { subject } = req.body;
    const { text } = req.body;
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log(email);
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: subject,
      text: text,
    });
    res.status(200).json();
  } catch (error) {
    res.send(error);
  }
};
