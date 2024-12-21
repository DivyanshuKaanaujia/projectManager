import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("connected",()=>{
    console.log("Connected to database")
})
mongoose.connection.on("error",(error)=>{
    console.log("Error in connecting to Db: ",error)
})
mongoose.connection.on("disconnectd",()=>{
    console.log("Disconnected with the database")
})
app.listen(3000,()=>{
    console.log("Running on port")
})
