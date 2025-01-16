require('dotenv').config();
const mysql = require('mysql2');

const urlDB = 'mysql://root:YtQzIDWjpKCzwSusvpzaesASqZnGczmw@mysql.railway.internal:3306/railway'

const connection = mysql.createConnection(urlDB)

module.exports = connection;