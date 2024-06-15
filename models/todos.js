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

export function getTodo(UserID, TodoID, callback) {
    existUserID(UserID, function(exist) {
        if (exist) {
            existTodoID(TodoID, function(exist) {
                if (exist) {
                    connection.query(
                        'SELECT * FROM Todos WHERE UserID = ? && ID = ?',
                        [UserID, TodoID],
                        function(error, results, fields) {
                            if (error) {
                                throw error;
                            } else {
                                if (results.length > 0) {
                                    callback(200, results);
                                } else {
                                    callback(200, {
                                        Message : 'La tarea no corresponde al usuario'
                                    });
                                }
                            }
                        }
                    )
                } else {
                    callback(500, {
                        Message : 'Todo ID does not exist'
                    });
                }
            });
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

function existTodoID(TodoID, callback) {
    connection.query(
        'SELECT * FROM Todos WHERE ID = ?',
        TodoID,
        function(error, results, fields) {
            if (error) {
                throw error;
            } else {
                callback(results.length > 0 ? true : false)
            }
        }
    )
}