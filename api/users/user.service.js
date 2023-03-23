const pool=require("../../config/database");

module.exports={
    create:(data,callback)=>{
        pool.query(
            `insert into registration(FirstName,LastName,gender,email,password,phno) 
             values(?,?,?,?,?,?)`,
             [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
             ],
             (error,results,fields)=>{
                if(error){
                   return callback(error)
                }
                  return callback(null,results)
             }
        );
    },
    getusers: callback=>{
      pool.query(
         `select * from registration`,
         [],
         (error,results,fields)=>{
            if(error){
               return callback(error);
            }
               return callback(null,results);
         }
      )
    },
    getuserbyuserid:(id,callback)=>{
      pool.query(
         `select * from registration where id=?`,
         [id],
         (error,results,fields)=>{
            if(error){
               callback(error);
            }
            return callback(null,results);
         }
      )
    },
    updateuser:(data,callback)=>{
      pool.query(
         `update registration set firstName=?,LastName=?,gender=?,email=?,password=?,phno=? where id=?`,
         [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
         ], 
         (error,results,fields)=>{
            if(error){
               callback(error);
            }
            return callback(null,results);
         }
      )
    },
    deleteuser:(data,callback)=>{
      pool.query(
         `delete from registration where id=?`,
         [data.id],
         (error,results,fields)=>{
            if(error){
               callback(error);
            }
            return callback(null,results);
         }
      )
    },
    getuserbyuseremail:(email,callback)=>{
      pool.query(
         `select * from registration where email=?`,
         [email],
         (error,results,fields)=>{
            if(error){
               callback(error);
            }
            return callback(null,results[0]);
         }
      )
    },

};