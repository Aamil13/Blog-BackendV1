import express  from "express";
// const express = require("express")
// require('dotenv').config()
import dotenv from "dotenv"
import userRouter from "./Routes/User-Routes.js";
import {connectdb} from './Utils/ConnectDB.js'
import PostRouter from "./Routes/Post-Routes.js";
import Cors from "cors"


const app = express()
app.use(Cors())
dotenv.config()


app.use(express.json())

// Routes
app.use("/user",userRouter)
app.use("/posts",PostRouter)
//DB


// const connectdb = require('./Utils/ConnectDB')
connectdb()





app.listen(5000, ()=>console.log("server running"))