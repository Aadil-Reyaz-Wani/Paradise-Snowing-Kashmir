import nodemailer from "nodemailer";

interface EmailPayload {
    to: string;
    cc?: string;
    subject: string;
    html: string;
    attachments?: {
        filename: string;
        content?: string | Buffer;
        path?: string;
        cid?: string;
        contentType?: string;
        contentDisposition?: 'attachment' | 'inline';
    }[];
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
    // We keep family: 4 to force IPv4 and avoid IPv6 timeouts
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
        family: 4, // Force IPv4
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 60000,
        socketTimeout: 60000,
    } as nodemailer.TransportOptions);

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
            attachments: data.attachments,
        });

        console.log("✅ Email sent successfully!", info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error: any) {
        console.error("❌ Failed to send email:", error);
        return { success: false, error: error.message };
    }
}
