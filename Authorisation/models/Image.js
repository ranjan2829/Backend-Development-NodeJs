const mongoose = require("mongoose");
const ImageDB=new mongoose.Schema(
    {
    url:{
        type:String,
        required:true,
    },
    publicID:{
        type:String,
        required:true,
    },
    uploadedBY:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

},
{timestamps:true}
);
module.exports=mongoose.model("IMAGE",ImageDB);
    
