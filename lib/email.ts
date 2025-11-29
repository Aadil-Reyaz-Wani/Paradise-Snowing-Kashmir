import nodemailer from "nodemailer";

interface EmailPayload {
    to: string;
    cc?: string;
    subject: string;
    html: string;
}

export async function sendEmail(data: EmailPayload) {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
        console.warn("⚠️ Email not sent: SMTP_USER or SMTP_PASS is missing in .env");
        return { success: false, error: "Missing SMTP credentials" };
    }

    console.log(`📧 Initializing email transport for user: ${smtpUser}`);

    // Reverting to 'service: gmail' as it proved most reliable for the user
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        // Keep timeouts to prevent infinite hanging
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    try {
        // Verify connection
        await transporter.verify();
        console.log("✅ SMTP Connection verified successfully.");

        // Send Mail
        console.log(`📨 Sending email to: ${data.to} (CC: ${data.cc || 'none'})`);
        const info = await transporter.sendMail({
            from: `"Paradise Snowing Kashmir" <${smtpUser}>`,
            to: data.to,
            cc: data.cc,
            subject: data.subject,
            html: data.html,
        });

        console.log("✅ Email sent successfully!", info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error: any) {
        console.error("❌ Failed to send email:", error);
        return { success: false, error: error.message };
    }
}
