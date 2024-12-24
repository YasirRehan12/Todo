 // mongodb+srv://yasirRehan:123@cluster0.3zczw.mongodb.net/
 
 const mongoose=require('mongoose')
 const conn=async (req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://yasirRehan:123@cluster0.3zczw.mongodb.net/").then(()=>{
            console.log("Database connected");
            
        })
        
    } catch (error) {
        
    }


 }

 
 conn()   // run