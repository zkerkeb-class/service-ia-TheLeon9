import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { chatRouter } from "./routes/chatRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ IA Chat service running on http://localhost:${PORT}`);
});

export default app;
