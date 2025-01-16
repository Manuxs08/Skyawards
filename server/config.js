require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    database: process.env.DB,
    password: process.env.PASSWORDDB
})

module.exports = connection;