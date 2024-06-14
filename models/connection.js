import mysql from 'mysql'

const connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'admin',
    password    : 'admin123',
    database    : 'todos'
});

export default connection;