const {Router} =require("express");
const { getToDo, saveToDo, updateToDo, deleteToDo } = require("../controllers/ToDoControllers");


const router=Router();


// router.get('/',(req,res)=>{
//     res.json({message:"Hello from nepal"})
// })

//this route is fetching the data from database using controller function
router.get('/',getToDo)

//this route is saving the data to the database using controller function too!
router.post('/save',saveToDo);

//this route is for updating the todo item
router.post('/update',updateToDo);

//this route is for deleting the todo item
router.post('/delete',deleteToDo);


module.exports=router;
  