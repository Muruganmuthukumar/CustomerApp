const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{ 
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use(express.json())

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})