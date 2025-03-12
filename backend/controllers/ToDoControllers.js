// const ToDoModel= require('../models/ToDoModel')



// //this will return all of the files from the database using .find() function to mongoose
// module.exports.getToDo=async (req,res)=>{
//     const toDo=await ToDoModel.find();
//     res.send(toDo);
// }

// module.exports.saveToDo=async (req,res)=>{

//     const {text}=req.body;
//     console.log("Request Body:", req.body);

//     ToDoModel
//     .create({text})
//     .then((data)=>{
//         console.log("Data Added Successfully ");
//         console.log(data);
//         res.send(data);
         
//     })
// }

// module.exports.updateToDo=async (req,res)=>{

//     const {_id , text}=req.body;

//     ToDoModel
//     .findByIdAndUpdate(_id,{text})
//     .then(()=> res.send("Updated Successfully"))
//     .catch((err)=>console.log("Update Error: ",err)
//     )
// }

// module.exports.deleteToDo=async (req,res)=>{

//     const {_id}=req.body;

//     ToDoModel
//     .findByIdAndDelete(_id)
//     .then(()=> res.send("Deleted Successfully"))
//     .catch((err)=>console.log("Delete Error: ",err)
//     )
// }



const ToDoModel = require('../models/ToDoModel');

// Get all todos
module.exports.getToDo = async (req, res) => {
    try {
        const toDo = await ToDoModel.find().sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).send(toDo);
    } catch (error) {
        res.status(500).send({ message: "Error fetching todos", error: error.message });
    }
};

// Save new todo
module.exports.saveToDo = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text || text.trim() === '') {
            return res.status(400).send({ message: "Todo text is required" });
        }
        
        const newTodo = await ToDoModel.create({ text });
        console.log("Todo added successfully:", newTodo);
        res.status(201).send(newTodo);
    } catch (error) {
        console.error("Error saving todo:", error);
        res.status(500).send({ message: "Error saving todo", error: error.message });
    }
};

// Update todo text or completed status
module.exports.updateToDo = async (req, res) => {
    try {
        const { _id, text, completed } = req.body;
        
        if (!_id) {
            return res.status(400).send({ message: "Todo ID is required" });
        }
        
        const updateData = {};
        if (text !== undefined) updateData.text = text;
        if (completed !== undefined) updateData.completed = completed;
        
        const updatedTodo = await ToDoModel.findByIdAndUpdate(
            _id,
            updateData,
            { new: true } // Return updated document
        );
        
        if (!updatedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        
        res.status(200).send(updatedTodo);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send({ message: "Error updating todo", error: error.message });
    }
};

// Toggle todo completed status
module.exports.toggleToDo = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!_id) {
            return res.status(400).send({ message: "Todo ID is required" });
        }
        
        const todo = await ToDoModel.findById(_id);
        
        if (!todo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        
        todo.completed = !todo.completed;
        await todo.save();
        
        res.status(200).send(todo);
    } catch (error) {
        console.error("Toggle error:", error);
        res.status(500).send({ message: "Error toggling todo status", error: error.message });
    }
};

// Delete todo
module.exports.deleteToDo = async (req, res) => {
    try {
        const { _id } = req.body;
        
        if (!_id) {
            return res.status(400).send({ message: "Todo ID is required" });
        }
        
        const deletedTodo = await ToDoModel.findByIdAndDelete(_id);
        
        if (!deletedTodo) {
            return res.status(404).send({ message: "Todo not found" });
        }
        
        res.status(200).send({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).send({ message: "Error deleting todo", error: error.message });
    }
};

// Get completed todos
module.exports.getCompletedToDos = async (req, res) => {
    try {
        const completedToDos = await ToDoModel.find({ completed: true }).sort({ updatedAt: -1 });
        res.status(200).send(completedToDos);
    } catch (error) {
        res.status(500).send({ message: "Error fetching completed todos", error: error.message });
    }
};

// Get active todos
module.exports.getActiveToDos = async (req, res) => {
    try {
        const activeToDos = await ToDoModel.find({ completed: false }).sort({ createdAt: -1 });
        res.status(200).send(activeToDos);
    } catch (error) {
        res.status(500).send({ message: "Error fetching active todos", error: error.message });
    }
};

// Delete all completed todos
module.exports.clearCompletedToDos = async (req, res) => {
    try {
        const result = await ToDoModel.deleteMany({ completed: true });
        res.status(200).send({ 
            message: "Completed todos cleared successfully", 
            count: result.deletedCount 
        });
    } catch (error) {
        res.status(500).send({ message: "Error clearing completed todos", error: error.message });
    }
};