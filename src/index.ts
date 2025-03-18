import express from  'express';
import mongoose from 'mongoose';
import { UserModel } from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

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

app.post('api/v1/signin', (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
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