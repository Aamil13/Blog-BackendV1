import mongoose from "mongoose";
// const mongoose = require("mongoose")

export const connectdb = async()=>{
    try{
       const connect = await mongoose.connect(process.env.MONGO_URL)
       console.log(`Mongo connected on: ${connect.connection.host}`);
    }
    catch(err){
        console.log('Mongo error', err);
    }
}

// module.exports = connectdb;

