import { Router } from "express";

import MicroService from "../models/MicroService.js";
import { authMiddleware } from "../middlewares/auth.js";

const router=Router();

router.post("/port/shorturls/",authMiddleware,async (req,res)=>
{
    try{
        const microService=new MicroService({...req.body,userId:req.user.id});
        await microService.save();
        res.status(201).json({
            message:"Short URL created Successfully",
        microService
    })

    }
    catch(err)
    {
        res.status(400).json({
            err:err.message,
        })
    }
})


export default router;



