const createPool=require('mysql2');
const pool=createPool.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password:"Solution@2023",
    database:"Testing",
    connectionLimit:10,
});
module.exports=pool;


//  const mysql=require('mysql');
//  const pool=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Solution@2023',
//     database:'Testing',
//  });
//  module.exports=pool;