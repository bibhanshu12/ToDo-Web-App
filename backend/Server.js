const { log } = require('console');
const express =require('express');
const mongoose=require('mongoose');
const app =express();
require('dotenv').config();
const routes=require('./routes/ToDoRoute');
const cors=require('cors')

const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected Successfully"))
.catch((err)=> console.log("Connection Unsuccessfull: ",err))





app.use(routes);


app.listen(PORT,()=>{
    console.log(`Listening on PORT:${PORT}`);
    
});
