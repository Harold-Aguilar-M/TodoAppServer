import connection from "./connection.js";

export function getTodos(userId) {
    connection.query('SELECT * FROM Todos WHERE UserID = ?', [userId]), function(error, results, fields) {
        if (error) throw error;
        return results;
        // console.log(fields);
    }
}