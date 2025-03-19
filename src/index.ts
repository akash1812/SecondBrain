import express from  'express';
import mongoose from 'mongoose';
import { UserModel } from './db';
import dotenv from 'dotenv';
import { Jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'

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

app.post('api/v1/content',(req,res)=>{
    
});

app.get('api/v1/content',(req,res)=>{

});

app.delete('api/v1/content',(req,res)=>{

});

app.post('/api/brain/share',(req,res)=>{

});

app.get('/api/brain/:shareLink',(req,res)=>{

});

app.listen(3000,()=>{
    console.log("Running at 3000");
    
})