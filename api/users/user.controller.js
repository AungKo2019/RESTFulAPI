const{create,getuserbyuserid,getusers,updateuser,deleteuser,getuserbyuseremail}=require("./user.service");
const{genSaltSync,hashSync,compareSync}=require("bcrypt");
const{sign}=require("jsonwebtoken");


module.exports={
    CreateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password =hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        });
    },
    getUserByUserID:(req,res)=>{
        const id=req.params.id;
        getuserbyuserid(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            //console.log(results,results[0],results.affectedRows)
            if(!results[0]){
                return res.json({
                    success:0,
                    message:"UserID "+ id +" Record Not Found"
                });
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        });
    },
    GetUsers:(req,res)=>{
        getusers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success:1,
                message:results
            });
        });
    },
    updateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password =hashSync(body.password,salt);
        updateuser(body,(err,results)=>{

            if(err){
                console.log(err);
                return ;
            }
            console.log(results);
            if(results.affectedRows===0){
                return res.json({
                    success:0,
                    message:"Fail Updated UserID "+ body.id +" Record Not Found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Updated Successfully"
            });
        });
    },
    deleteUser:(req,res)=>{
        const data=req.body;
        deleteuser(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(results , results[0],results.affectedRows)
            if(results.affectedRows===0){
                return res.json({
                    success:0,
                    message:"Fail Delete UserID "+ data.id +" Record Not Found"
                });
            }
            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
    login:(req,res)=>{
        const body=req.body;
        getuserbyuseremail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email"
                });
            }
            const resul=compareSync(body.password,results.password);
            if(resul){
                results.password=undefined;
                console.log(results);
                const jsontoken=sign({result:results},"qwe1234",{expiresIn:"1hr"});
                console.log(jsontoken);
                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token:jsontoken
                });
            }else {
                return res.json({
                    success:0,
                    message:"Invalid password"
                });
            }
        });
    },
}