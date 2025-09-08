import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import isURL from "validator/lib/isURL.js";

const router=Router();

router.post("/register",async(req,res)=>
{
    try{
        const {mail,password}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);
        const user=new User({mail,password:hashedpassword});
        await user.save();
        res.status(201).json({
            message:"User registered Successfully",
            user
        });
    }
    catch(err)
    {
        res.status(400).json({
            error:err.message,
        })
    }
});

router.post("/login",async(req,res)=>
{
    try{
        const{mail,password}=req.body;
        const user=await User.findOne({mail});
        if(!user) return res.status(404).json({
            error:"User not found",
        });

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({
            error:"Invalid Passwrod",
        })

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({
            message:"User logged in Successfully",
            token
        })
    }
    catch(err)
    {
        res.status(500).json(
            {
                error:err.message,
            }
        )
    }
})

export default router;