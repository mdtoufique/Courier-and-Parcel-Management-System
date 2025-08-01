import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db.js";
import app from "./app.js";

const PORT=process.env.PORT;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
});

