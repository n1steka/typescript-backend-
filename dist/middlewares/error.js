"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.log(err.stack.cyan.underline);
    const error = Object.assign({}, err);
    error.message = err.message;
    if (error.name === "CastError") {
        error.message = "Энэ ID буруу бүтэцтэй ID байна!";
        error.statusCode = 400;
    }
    if (error.code === 11000) {
        error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй!";
        error.statusCode = 400;
    }
    res.status(err.statusCode || 500).json({
        success: false,
        error,
    });
};
exports.default = errorHandler;
