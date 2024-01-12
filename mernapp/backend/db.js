const { json } = require('express');
const mongoose = require('mongoose')

const URL ="mongodb://127.0.0.1:27017/gofoodmern"
// mongoose.connect(URL);
// const connectDB =async()=>{
//         mongoose.connect(URL,{useNewUrlParser:true},async(err,result)=>{
//             if(err) console.log("err");
//             else{
//                 console.log("connected");
//             }
        
//     });
// }
const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(URL);
        if(connectionInstance){
            console.log("database is connected");
           
        }
        const fetched_data=await mongoose.connection.db.collection("food_items");
        
        fetched_data.find({}).toArray((err,data)=>{
            if(err) console.log(err);
            else{
                global.food_items=data;
                console.log(global.food_items)
            }
        })
        //console.log("\n MongoDB connected !! DB HOST:");
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

 module.exports=connectDB;
