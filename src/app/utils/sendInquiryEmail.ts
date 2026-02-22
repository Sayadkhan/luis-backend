import nodemailer from "nodemailer";
import config from "../config";

interface InquiryEmailData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  message?: string;
  reason?: string;
  phone?: string;
  country?: string;
  state?: string;
  guests?: string;
  interest?: string;
  preferredLocation?: string;
  howDidYouHear?: string;
  formType?: "contact" | "request-information";
}

const REASON_LABELS: Record<string, string> = {
  learn: "Learn about timeshare ownership",
  "owner-services": "Existing owner – Owner Services",
  "vacation-portfolio": "Existing owner – Add to vacation portfolio",
  general: "General enquiry",
};

const row = (label: string, value?: string) =>
  value
    ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
          <p style="margin:0 0 2px 0;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">${label}</p>
          <p style="margin:0;color:#1e293b;font-size:15px;font-weight:500;">${value}</p>
        </td>
      </tr>`
    : "";

export const sendInquiryEmail = async (data: InquiryEmailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.admin_email,
      pass: config.email_app_password,
    },
  });

  const displayName =
    data.name ||
    `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
    "Unknown";

  const isRequestInfo = data.formType === "request-information";
  const subjectLine = isRequestInfo
    ? `New Information Request from ${displayName} — Endless Vacations Hub`
    : `New Enquiry from ${displayName} — Endless Vacations Hub`;

  const badgeText = isRequestInfo ? "INFORMATION REQUEST" : "NEW SUBMISSION";

  const bodyRows = isRequestInfo
    ? `
      ${row("First Name", data.firstName)}
      ${row("Last Name", data.lastName)}
      ${row("Email Address", `<a href="mailto:${data.email}" style="color:#C6AC5E;text-decoration:none;">${data.email}</a>`)}
      ${row("Phone", data.phone)}
      ${row("Country", data.country)}
      ${row("State / Province", data.state)}
      ${row("Number of Guests", data.guests)}
      ${row("Interest", data.interest)}
      ${row("Preferred Location", data.preferredLocation)}
      ${row("How Did You Hear?", data.howDidYouHear)}
      ${data.message ? `<tr><td style="padding:12px 0;"><p style="margin:0 0 8px 0;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Additional Notes</p><div style="background:#f8fafc;border-left:4px solid #C6AC5E;border-radius:0 8px 8px 0;padding:16px 20px;"><p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${data.message.replace(/\n/g, "<br/>")}</p></div></td></tr>` : ""}
    `
    : `
      ${row("Full Name", displayName)}
      ${row("Email Address", `<a href="mailto:${data.email}" style="color:#C6AC5E;text-decoration:none;">${data.email}</a>`)}
      ${row("Reason for Contact", REASON_LABELS[data.reason || ""] || data.reason)}
      ${data.message ? `<tr><td style="padding:12px 0;"><p style="margin:0 0 8px 0;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Message</p><div style="background:#f8fafc;border-left:4px solid #C6AC5E;border-radius:0 8px 8px 0;padding:16px 20px;"><p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${data.message.replace(/\n/g, "<br/>")}</p></div></td></tr>` : ""}
    `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:40px 48px;text-align:center;">
                  <p style="margin:0 0 4px 0;color:#C6AC5E;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Endless Vacations Hub</p>
                  <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:300;letter-spacing:1px;">${isRequestInfo ? "New Information Request" : "New Contact Enquiry"}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 48px 0;">
                  <div style="display:inline-block;background:#FEF3C7;border:1px solid #F59E0B;border-radius:100px;padding:6px 16px;">
                    <span style="color:#92400E;font-size:12px;font-weight:700;letter-spacing:1px;">${badgeText}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 48px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${bodyRows}
                  </table>
                  <div style="margin-top:32px;text-align:center;">
                    <a href="mailto:${data.email}?subject=Re: Your Enquiry" style="display:inline-block;background:#C6AC5E;color:#1a1a2e;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:8px;">Reply to ${displayName}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 48px;text-align:center;">
                  <p style="margin:0;color:#94a3b8;font-size:12px;">Sent automatically from Endless Vacations Hub admin system.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Endless Vacations Hub" <${config.admin_email}>`,
    to: config.admin_email,
    replyTo: data.email,
    subject: subjectLine,
    html,
  });
};
