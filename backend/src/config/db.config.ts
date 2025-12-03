import mysql, { Connection } from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const user_db = process.env.DB_USER || ''
const pass_db = process.env.DB_PASS  ||''
const name_db = process.env.DB_NAME || ''

const connection: Connection = mysql.createConnection({
  host     : 'localhost',
  user     : user_db,
  password : pass_db,
  database : name_db
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


export default connection

