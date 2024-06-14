import connection from "./connection.js";

export function getUser(userId, callback) {
    connection.query('SELECT * FROM Users WHERE UserID = ?', [userId]), function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            callback(results);
        }
    }
}

export function getUsers(callback) {
    connection.query('SELECT * FROM Users', function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            callback(results);
        }
    });
}

export function insertUser(data, callback) {
    existUser(data.Username, function(exist) {
        if ( ! exist) {
            connection.query(
                'INSERT INTO Users SET ?',
                data,
                function(error, results, fields) {
                    if (error) {
                        throw error;
                    } else {
                        callback(200, {
                            Message : 'User registration correctly',
                            UserID  : data.ID,
                        });
                    }
                }
            );
        } else {
            callback(500, {
                Message : 'User already exist'
            });
        }
    });
}

export function existUser(username, callback) {
    connection.query(
        'SELECT * FROM Users WHERE Username = ?',
        [username],
        function(error, results, fields) {
            if (error) {
                throw error;
            } else {
                callback(results.length > 0 ? true : false);
            }
        }
    )
}

export function existUserID(UserID, callback) {
    connection.query(
        'SELECT * FROM Users WHERE ID = ?',
        [UserID],
        function(error, results, fields) {
            if (error) {
                throw error;
            } else {
                callback(results.length > 0 ? true : false);
            }
        }
    )
}