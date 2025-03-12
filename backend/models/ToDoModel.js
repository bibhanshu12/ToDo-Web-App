const mongoose=require('mongoose');

const mongooseSchema= mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model('ToDo',mongooseSchema);