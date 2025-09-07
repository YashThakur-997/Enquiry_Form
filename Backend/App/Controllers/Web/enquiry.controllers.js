let express=require("express");
let enquirymodel=require("../../Model/enquiry.model");

let enquiryInsert=async (req,res)=>{

    let obj={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone
    }

    let data = new enquirymodel(obj);
    await data.save().then(() => {
        res.send({ "msg": "Data Inserted" })
    }).catch((err) => {
        res.send({ "msg": "Error", "error": err })
    })

    console.log(obj)
}

let enquiryView=async (req,res)=>{
    let data=await enquirymodel.find()
    res.send(data)
}

let enquirydelete=async (req,res)=>{
    let id=req.params.id

    await enquirymodel.deleteOne({_id:id}).then(()=>{
        res.send({"msg":"Data Deleted"})
    })
}

let enquiryedit=async (req,res)=>{
    let id=req.params.id

    let data=await enquirymodel.findOne({_id:id})

    console.log(data)
    res.send(data)
}

let enquiryupdate=async (req,res)=>{
    let id=req.params.id

    let obj={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone
    }

    await enquirymodel.updateOne({_id:id},obj)
}

module.exports={enquiryInsert,enquiryView,enquirydelete,enquiryedit,enquiryupdate}