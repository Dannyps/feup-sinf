"use strict";

/**
 * Insert a ship_from into the database
 *
 * @param {*} sf ship_from
 * @param {*} aID the id of the inserted address
 * @return {Promise}
 */
module.exports = function (sf, aID) {
    let sql = "INSERT INTO ship_from (delivery_date, address_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [sf.DeliveryDate._text, aID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            resolve(result.insertId);
        });
    })
};