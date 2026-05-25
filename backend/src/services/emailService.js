import nodemailer from "nodemailer";

// Initialize the mail transporter using your existing environment configuration
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false, // TLS requirements for port 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

/**
 * Sends an urgent notification email with suspect details and embedded evidence
 * @param {string} recipientEmail - Email address of the officer or administrator
 * @param {object} alert - The database alert record
 * @param {object} criminal - The database criminal profile details
 * @param {string} liveImageBase64 - The snapshot base64 text collected from the camera
 */
export const sendAlertEmail = async (recipientEmail, alert, criminal, liveImageBase64) => {
  try {
    const isHighRisk = criminal.riskLevel === "HIGH" || criminal.riskLevel === "CRITICAL";
    
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "Thief Detect System"}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipientEmail,
      subject: `🚨 ${isHighRisk ? "CRITICAL ALERT" : "SECURITY NOTICE"}: ${criminal.fullName} Detected!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 2px solid #d9534f; padding: 20px; border-radius: 8px;">
          <h2 style="color: #d9534f; margin-top: 0;">Thief Detect — Security Threat Warning</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <p><strong>Alert Code:</strong> <span style="background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${alert.alertCode}</span></p>
          <p><strong>Location:</strong> ${alert.location}</p>
          <p><strong>Detected Time:</strong> ${new Date(alert.detectedAt).toLocaleString()}</p>
          <p><strong>Match Confidence:</strong> ${parseFloat(alert.confidenceScore).toFixed(2)}%</p>
          
          <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Suspect Database Profile</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 5px 0; color: #666; width: 120px;"><strong>Full Name:</strong></td>
              <td style="padding: 5px 0;"><strong>${criminal.fullName}</strong> ${criminal.aliasName ? `(${criminal.aliasName})` : ""}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;"><strong>Criminal Code:</strong></td>
              <td style="padding: 5px 0; font-family: monospace;">${criminal.criminalCode}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;"><strong>Crime Type:</strong></td>
              <td style="padding: 5px 0; color: #d9534f; font-weight: bold;">${criminal.crimeType}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;"><strong>Risk Level:</strong></td>
              <td style="padding: 5px 0;"><span style="color: white; background: ${isHighRisk ? "#d9534f" : "#f0ad4e"}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${criminal.riskLevel}</span></td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;"><strong>Current Status:</strong></td>
              <td style="padding: 5px 0; font-weight: bold;">${criminal.status}</td>
            </tr>
            ${criminal.description ? `<tr><td style="padding: 5px 0; color: #666;"><strong>Description:</strong></td><td style="padding: 5px 0; font-style: italic;">${criminal.description}</td></tr>` : ""}
          </table>
          
          <br />
          <p style="font-size: 12px; color: #777; background: #fff3cd; border: 1px solid #ffeeba; padding: 10px; border-radius: 4px;">
            <strong>Pro-tip:</strong> Check the attachment area of this email to inspect the cropped face capture received directly from the AI detection engine.
          </p>
        </div>
      `,
      attachments: liveImageBase64 ? [
        {
          filename: "live_capture.jpg",
          content: liveImageBase64,
          encoding: "base64",
        }
      ] : []
    };

    const deliveryReport = await transporter.sendMail(mailOptions);
    console.log(`✉️ Alert Email dispatched to ${recipientEmail} [ID: ${deliveryReport.messageId}]`);
  } catch (deliveryError) {
    console.error(`⚠️ Failed email transmission to ${recipientEmail}:`, deliveryError);
  }
};