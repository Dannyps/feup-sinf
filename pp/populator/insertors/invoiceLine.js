"use strict";

/**
 * Insert an invoice line into the database
 *
 * @param {*} line
 * @return {int} the id of the inserted line.
 */
module.exports = function (line) {

    let sql = "INSERT INTO product VALUES (?, ?, ?, ?, ?)";
    let inserts = ['users', 'id', userId];
    sql = mysql.format(sql, inserts);

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    console.log(line);
};