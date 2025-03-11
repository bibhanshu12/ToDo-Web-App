const ToDoModel= require('../models/ToDoModel')



//this will return all of the files from the database using .find() function to mongoose
module.exports.getToDo=async (req,res)=>{
    const toDo=await ToDoModel.find();
    res.send(toDo);
}

module.exports.saveToDo=async (req,res)=>{

    const {text}=req.body;
    console.log("Request Body:", req.body);

    ToDoModel
    .create({text})
    .then((data)=>{
        console.log("Data Added Successfully ");
        console.log(data);
        res.send(data);
         
    })
}

module.exports.updateToDo=async (req,res)=>{

    const {_id , text}=req.body;

    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then(()=> res.send("Updated Successfully"))
    .catch((err)=>console.log("Update Error: ",err)
    )
}

module.exports.deleteToDo=async (req,res)=>{

    const {_id}=req.body;

    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("Deleted Successfully"))
    .catch((err)=>console.log("Delete Error: ",err)
    )
}