import mongoose from "mongoose";
import isURL from "validator/lib/isURL.js";

const microServiceSchema=new mongoose.Schema({
    url:
    {
       type:String,
       required:true,
        validate: {
      validator: (validate) => isURL(validate, { protocols: ["http","https"], require_protocol: true }),
      message: (props) => `${props.value} is not a valid URL!`
    }
    },
    validity:
    {
        type:String,
        required:true
    },
    shortcode:
    {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
    },
   expiryDate: Date, 
  validity: {
    type: String,
    default: "30min"
  }
})

microServiceSchema.pre("save", function (next) {
  const duration = (this.validity || "30min").toLowerCase();

  let ms = 0;
  if (duration.endsWith("min")) {
    ms = parseInt(duration) * 60 * 1000;
  } else if (duration.endsWith("h")) {
    ms = parseInt(duration) * 60 * 60 * 1000;
  } else if (duration.endsWith("d")) {
    ms = parseInt(duration) * 24 * 60 * 60 * 1000;
  } else {
    ms = 30 * 60 * 1000; 
  }

  this.expiryDate = new Date(this.createdAt.getTime() + ms);
  next();
});

export default mongoose.model("MicroService",microServiceSchema);