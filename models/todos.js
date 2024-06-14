import connection from "./connection.js";
import { existUserID } from "./users.js";

export function getTodos(UserID, callback) {
    existUserID(UserID, function(exist) {
        if (exist) {
            connection.query(
                'SELECT * FROM Todos WHERE UserID = ?',
                [UserID],
                function(error, results, fields) {
                    if (error) {
                        throw error;
                    } else {
                        callback(200, results);
                    }
                }
            );
        } else {
            callback(500, {
                Message : 'Username does not exist'
            });
        }
    });
}

export function insertTodo(data, callback) {
    existUserID(data.UserID, function(exist) {
        if (exist) {
            connection.query(
                'INSERT INTO Todos SET ?',
                data,
                function(error, results, fields) {
                    if (error) {
                        throw error;
                    } else {
                        callback(200, {
                            Message : 'Todo registration correctly',
                            TodoID  : data.ID,
                        });
                    }
                }
            );
        } else {
            callback(500, {
                Message : 'Username does not exist'
            });
        }
    });
}