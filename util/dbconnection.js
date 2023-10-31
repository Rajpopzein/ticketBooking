const Pool = require("pg").Pool;
require("dotenv").config();

// console.log(process.env.password)

const connection = new Pool({
  user: `${process.env.user}`,
  port: `${process.env.dbport}`,
  host: `${process.env.url}`,
  database: `${process.env.database}`,
  password: `${process.env.password}`,
  ssl: true,
  keepAlive: true,
});

// connection.connect((err)=>{
//     if(err){
//         console.log("err",err)
//     }
//     else{
//         console.log("dbconnected successfully")
//     }
// })

module.exports = connection;
