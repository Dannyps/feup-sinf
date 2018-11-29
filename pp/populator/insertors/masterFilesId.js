"use strict";

/**
 * Inserts a single line to the master_file table of the databse.
 *
 * @param {*} id
 * @return {int} the id of the inserted line.
 */
module.exports = async function (id) {

    let sql = "INSERT INTO master_files VALUES (?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [id];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result.insertId);
        });
    })
};