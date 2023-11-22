const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const cors = require('cors')
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{ 
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products',productRouter)
app.use('/api/users',userRouter) 
app.use('/api/admin',adminRouter) 

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})