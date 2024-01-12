const express = require('express')
const cors = require("cors");

const app = express();
const port =5000
const connectDB= require("./db")
const User = require('./models/User')
const createRouter=require("./Routes/CreateUser")
connectDB();

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })
app.use(cors({
    origin:"http://localhost:3000",
}));
app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.use(express.json());
app.use("/api",createRouter);
//app.use("/api",require("./"))

// app.post("/creatuser",async(req,res)=>{
//     let user = new User(req.body)
//     let result= await user.save();
//     res.send(result);
     
// })

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})