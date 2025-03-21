import mongoose, {model, Model,Schema} from 'mongoose';
import {z} from 'zod';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const UserSchema =  new Schema({
    username : {type: String, unique: true},
    password : String
});

export const UserModel = model("User", UserSchema);