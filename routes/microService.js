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
            shortlink:`http://localhost:4000/port/${microService.shortcode}`,
            expiryDate:microService.expiryDate,
    })

    }
    catch(err)
    {
        res.status(400).json({
            err:err.message,
        })
    }
})


router.get("/port/shorturls/:shortcode", authMiddleware, async (req, res) => {
  try {
    const microService = await MicroService.findOne({
      shortcode: req.params.shortcode,
      userId: req.user.id, 
    });

    if (!microService) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({
      originalUrl: microService.url,
      shortcode: microService.shortcode,
      expiryDate: microService.expiryDate,
      createdAt: microService.createdAt,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});



export default router;



