const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'e-learning',
    password: 'Samsung123!'
});

module.exports = pool.promise();