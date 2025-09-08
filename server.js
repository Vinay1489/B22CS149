import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import {connectDB} from "./db.js";

import authRouter from "./routes/auth.js";

import microServiceRouter from "./routes/microService.js";



dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(rateLimit({windowMs:1000*60,max:100}));

app.use("/",authRouter);

app.use("/",microServiceRouter);

app.get("/check",(req,res)=>
{
    res.json(
        {
            status:"OK server is running fine",
        }
    )
});

const PORT=process.env.PORT||4000;
app.listen(PORT,async()=>
{
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});