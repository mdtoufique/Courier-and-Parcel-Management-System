import { sendEmail } from "./utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

const sendTestEmail = async () => {
	try {
		await sendEmail({
			to: "mdrehmant@gmail.com", 
			subject: "Test Email from Parcel System",
			text: "This is a test email to verify if your email service is working.",
			html: "<p>This is a <strong>test email</strong> to verify if your email service is working.</p>",
		});
		console.log("✅ Email sent successfully");
	} catch (err) {
		console.error("❌ Error sending email:", err.message);
	}
};

sendTestEmail();
