import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendTestEmail = async () => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: `"Parcel System" <${process.env.EMAIL_USER}>`,
			to: "@gmail.com", 
			subject: "Test Email from Parcel System",
			text: "This is a test email to verify if your email service is working.",
		});

		console.log("✅ Email sent:", info.messageId);
	} catch (error) {
		console.error("❌ Error sending email:", error);
	}
};

sendTestEmail();
