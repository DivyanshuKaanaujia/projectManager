import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js";
import cors from "cors"
import connectDB from "./config/db.js";


const app = express();
dotenv.config()
app.use(cors())

connectDB();


app.use(express.json())

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`)
})
