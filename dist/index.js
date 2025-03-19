"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const jwtPass = process.env.JWT_PWD;
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            msg: "User signed up"
        });
    }
    catch (error) {
        res.status(411).json({
            msg: "User already exists!"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const checkUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (checkUser) {
        const token = jsonwebtoken_1.default.sign({
            id: checkUser._id
        }, jwtPass);
        res.json({
            msg: token
        });
    }
    else {
        res.status(403).json({
            msg: "Incorrect credentials"
        });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        msg: "Content created"
    });
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    const deleteContent = yield db_1.ContentModel.deleteMany({
        contentId,
        userId
    });
    res.json({
        msg: "Content deleted"
    });
}));
app.post('/api/brain/share', (req, res) => {
});
app.get('/api/brain/:shareLink', (req, res) => {
});
app.listen(3000, () => {
    console.log("Running at 3000");
});
