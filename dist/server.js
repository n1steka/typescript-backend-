"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("./middlewares/error"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routers/user-route"));
dotenv_1.default.config({ path: "./config/config.env" });
const PORT = parseInt(process.env.PORT || "8080", 10);
const app = (0, express_1.default)();
app.use("/user", user_route_1.default);
app.use(error_1.default);
const server = app.listen(PORT, () => {
    console.log(`Express server is running on port http://localhost:${PORT}`);
});
process.on("unhandledRejection", (err, promise) => {
    console.log(`Unhandled rejection error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
