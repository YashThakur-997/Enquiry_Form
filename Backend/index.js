let express=require("express");  //to create server
let mongoose=require("mongoose"); //to connect to mongodb
let cors=require("cors"); //to handle cors error
const Enquiryrouter = require("./App/Routes/Web/enquiry.routes");
let app=express(); //instance of express
require("dotenv").config(); //to use .env file

app.use(cors())  //to handle cors error

app.use(express.json()) //to parse json data

//routes
app.use("/enquiry",Enquiryrouter);

app.get("/",(req,res)=>{
    res.send("Hello World")
})


//database connection
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to database")
    app.listen(process.env.PORT);            //to start server
}).catch((err)=>{
    console.log("Error connecting to database",err)
})
