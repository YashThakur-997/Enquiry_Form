let mongoose=require("mongoose") //to connect to mongodb


let enquirySchema= new mongoose.Schema({  //to create schema
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },

})

let enquirymodel=mongoose.model("enquiry",enquirySchema)  //to create model
module.exports=enquirymodel; //to export model