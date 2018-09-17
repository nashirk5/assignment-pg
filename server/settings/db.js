const mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ccpl@1234",
    database: "pg"
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connected to the MySql DB');
});

module.exports = conn;