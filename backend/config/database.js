require('dotenv').config()

const mysql = require('mysql')

const connection = mysql.createConnection({
  host               : process.env.DB_HOST,
  port               : process.env.DB_PORT,
  user               : process.env.DB_USERNAME,
  password           : process.env.DB_PASSWORD,
  database           : process.env.DB_DATABASE,
  multipleStatements : true
})

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection