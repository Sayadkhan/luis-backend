import nodemailer from "nodemailer";
import config from "../config";

export const SendEmail = async (email: string, html: string) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.node_env === "production", 
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Security Notification - Luis Vacation Club",
    text: "Please follow the instructions in the email to complete the security action.", 
    html,
  });
};
