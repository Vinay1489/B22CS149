import mongoose from "mongoose";

const microServiceSchema=new mongoose.Schema({
    url:
    {
       type:URL,
       required:true,
    },
    validity:
    {
        type:String,
        required:true
    },
    shortcode:
    {
        type:String,
        required:true
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

export default mongoose.model("MicroService",microServiceSchema);