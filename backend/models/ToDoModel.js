const mongoose=require('mongoose');

const mongooseSchema= mongoose.Schema({
    text:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('ToDo',mongooseSchema);