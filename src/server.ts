import express, { Application } from "express";
import errorHandler from "./middlewares/error";
import dotenv from "dotenv";
import userRoute from "./routers/user-route";

dotenv.config({ path: "./config/config.env" });

const PORT: number = parseInt(process.env.PORT || "8080", 10);
const app: Application = express();

app.use("/user", userRoute);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Express server is running on port http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
  console.log(`Unhandled rejection error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
