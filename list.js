const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const List = require("../models/list.js")

//create task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, email } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const list = new List({ title, body, user: existingUser })
            await list.save().then(() => { res.status(200).json({ list }) })
            existingUser.list.push(list)
            existingUser.save()

        }
        if (!existingUser) {
            res.status(400).json({ message: "this email is not exist" })
        }
    } catch (error) {
        console.log("Error from list.js from routes", error);

    }
})
//++++++++++++++++++++++++++++++Updata task+++++++++++++++++++++++++++++++++++++++++
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
           const list= await List.findByIdAndUpdate(req.params.id, { title, body })
           await  list.save().then(() => { res.status(200).json({ message: "Task updated" ,list}) })
        }
        if (!existingUser) {
            res.status(400).json({ message: "User is not register" });
            console.log("user is not register");


        }
    } catch (error) {
        console.log("Error from list.js and updateTask", error);

    }

})
// ++++++++++++++++++++ Delete Task+++++++++++++++++++++++++++
router.delete("/deleteTask/:id",async(req,res)=>{
    try {
         const {email}=req.body
         const existingUser=await User.findOneAndUpdate({email},{$pull:{list:req.params.id}})
         if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(()=>{res.status(200).json({message:"Task is deleted"})})
         }
         if(!existingUser){
            res.status(500).json({message:"user is not register"})
         }
    
    } catch (error) {
        console.log("Error from list.js and delete task", error);
        
        
    }
})
// ++++++++++++++++++++ Get Task+++++++++++++++++++++++++
router.get("/getTask/:id",async(req,res)=>{
   try {
     const list=await List.find({user:req.params.id}).sort({createdAt:-1})
     list:
     if(list.length!==0){
         res.status(200).json({list:list})
        }
        else{
         res.status(200).json({"message":"No Tasks"})

     }
     console.log("Get Task ",list);
     
   } catch (error) {
    console.log("Error from getTask ",error)
    
   }
})

module.exports = router