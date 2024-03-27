const mongoose=require("mongoose")
const mysql = require("mysql2/promise");
require("dotenv").config()

const connection = mongoose.connect(process.env.MongoDB_URL)


// mysql connection
const mysqlConnection = async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    post: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log({ error });
    return "errror accessing";
  }
}



module.exports={
    connection,mysqlConnection
}
