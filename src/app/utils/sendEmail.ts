import nodemailer from "nodemailer";
import config from "../config";

export const SendEmail = async (email: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.node_env === "production", // true for 465, false for other ports
    auth: {
      user: "gsca.mymensingh@gmail.com",
      pass: "elcc giwv boyk bagk",
    },
  });

  await transporter.sendMail({
    from: "gsca.mymensingh@gmail.com",
    to: email,
    subject: "Security Notification - Luis Vacation Club",
    text: "Please follow the instructions in the email to complete the security action.", // plain‑text body
    html, // HTML body
  });
};
