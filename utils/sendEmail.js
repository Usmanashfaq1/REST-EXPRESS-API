import nodemailer from "nodemailer";
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "usmanx458@gmail.com",
    pass: "xhtp bmpf ovcb bbfa",
  },
});


const sendRecoveryLink = async ({ to, subject, text }) => {
  try{
    const info = await transporter.sendMail({
    from: `"Password Reset Link - CPT" <usmanx458@gmail.com>`,
    to,
    subject,
    text,
  });

  console.log("✅ Email sent:", info.messageId);

  }
  catch(err)
  {
    throw err;
  }
  
};

export default sendRecoveryLink;
