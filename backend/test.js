import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendTestEmail = async () => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"Parcel System" <${process.env.MAIL_USER}>`,
			to: "dummyemail@example.com", // 🔁 replace with your test email
			subject: "Test Email from Parcel System",
			text: "This is a test email to verify if your email service is working.",
		});

		console.log("✅ Email sent:", info.messageId);
	} catch (error) {
		console.error("❌ Error sending email:", error);
	}
};

sendTestEmail();
