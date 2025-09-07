let express=require("express");
const { enquiryInsert,enquiryView,enquirydelete,enquiryedit, enquiryupdate } = require("../../Controllers/Web/enquiry.controllers");
let enquiryrouter=express.Router();

enquiryrouter.post("/insert",enquiryInsert)

enquiryrouter.get("/view",enquiryView)

enquiryrouter.delete("/delete/:id",enquirydelete)

enquiryrouter.get("/edit/:id",enquiryedit)

enquiryrouter.put("/update/:id",enquiryupdate)

module.exports=enquiryrouter;