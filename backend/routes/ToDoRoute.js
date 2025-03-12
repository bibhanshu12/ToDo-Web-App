// const {Router} =require("express");
// const { getToDo, saveToDo, updateToDo, deleteToDo } = require("../controllers/ToDoControllers");


// const router=Router();


// // router.get('/',(req,res)=>{
// //     res.json({message:"Hello from nepal"})
// // })

// //this route is fetching the data from database using controller function
// router.get('/',getToDo)
 
// //this route is saving the data to the database using controller function too!
// router.post('/save',saveToDo);

// //this route is for updating the todo item
// router.post('/update',updateToDo);

// //this route is for deleting the todo item
// router.post('/delete',deleteToDo);


// module.exports=router;
  


const { Router } = require("express");
const { 
    getToDo, 
    saveToDo, 
    updateToDo, 
    deleteToDo,
    toggleToDo,
    getCompletedToDos,
    getActiveToDos,
    clearCompletedToDos
} = require("../controllers/ToDoControllers");

const router = Router();

// Get all todos
router.get('/', getToDo);

// Get completed todos
router.get('/completed', getCompletedToDos);

// Get active todos
router.get('/active', getActiveToDos);

// Create a new todo
router.post('/save', saveToDo);

// Update a todo's text or completed status
router.put('/update', updateToDo);

// Toggle a todo's completed status
router.put('/toggle', toggleToDo);

// Delete a todo
router.delete('/delete', deleteToDo);

// Clear all completed todos
router.delete('/clear-completed', clearCompletedToDos);

module.exports = router;