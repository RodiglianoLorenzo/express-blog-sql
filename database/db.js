const mysql = require('mysql2');
const credentials = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'my_user',
    password: process.env.DB_PASSWORD || 'my_secret_password',
    database: process.env.DB_NAME || 'my_database'
};
console.log(credentials);

const connection = mysql.createConnection(credentials);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

module.exports = connection;