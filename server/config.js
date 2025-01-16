require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    database: process.env.DB,
    password: process.env.PASSWORDDB
})

module.exports = connection;