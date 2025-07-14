import nodemailer from "nodemailer";
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASS}`,
  },
});


const sendRecoveryLink = async ({ to, subject, text }) => {
  try{
    const info = await transporter.sendMail({
    from: `"Password Reset Link - CPT" <${process.env.EMAIL}>`,
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
