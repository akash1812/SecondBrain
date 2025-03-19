import express from  'express';
import mongoose from 'mongoose';
import { ContentModel, UserModel } from './db';
import dotenv from 'dotenv';
import { Jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import { userMiddleware } from './middleware';

dotenv.config();

const app = express();
app.use(express.json());

const jwtPass = process.env.JWT_PWD;
app.post('/api/v1/signup',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        await UserModel.create({
            username: username,
            password: password
        })
    
        res.status(200).json({
            msg: "User signed up"
        })
    } catch (error) {
        res.status(411).json({
            msg: "User already exists!"
        })
    }
    
});

app.post('/api/v1/signin', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const checkUser = await UserModel.findOne({
        username,
        password
    })
    if(checkUser){
        const token = jwt.sign({
            id: checkUser._id
        }, jwtPass)

        res.json({
            msg: token
        })
    }else{
        res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
});

app.post('/api/v1/content',userMiddleware,async(req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        msg: "Content created"
    })
});

app.get('/api/v1/content',userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
});

app.delete('/api/v1/content',userMiddleware,async(req,res)=>{
    const contentId =  req.body.contentId;
    //@ts-ignore
    const userId =  req.userId;
    const deleteContent = await ContentModel.deleteMany({
        contentId,
        userId
    })
    res.json({
        msg:"Content deleted"
    })
});

app.post('/api/brain/share',(req,res)=>{

});

app.get('/api/brain/:shareLink',(req,res)=>{

});

app.listen(3000,()=>{
    console.log("Running at 3000");
    
})