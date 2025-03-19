"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtPass = process.env.JWT_PWD;
const userMiddleware = (req, res, next) => {
    const header = req.header("authorization");
    const decoded = jsonwebtoken_1.default.verify(header, jwtPass);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "You're not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
