require("dotenv").config();
const express =require('express');
const app=express();
const port=process.env.APP_PORT || 3002;
const userRouter=require("./api/users/user.router");

app.use(express.json());
app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.json({
        success:1,
        message:"This is rest api working"
    });
});

app.listen(port,()=>{   
    console.log("Server is running on PORT:" , port);
});