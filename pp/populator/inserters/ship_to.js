"use strict";

/**
 * Insert a ship_to into the database
 *
 * @param {*} st ship_to
 * @param {*} aID the id of the inserted address
 * @return {Promise}
 */
module.exports = function (st, aID) {
    let sql = "INSERT INTO ship_to (delivery_date, address_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [st.DeliveryDate._text, aID];
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


