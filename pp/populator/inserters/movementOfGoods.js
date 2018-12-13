"use strict";

/**
 * Inserts a single line to the movement_of_goods table of the database.
 *
 * @param {*} id
 * @return {Promise}
 */
module.exports = async function (mg) {
    let sql = "INSERT INTO movement_of_goods VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [MovementGoodsID, mg.NumberOfMovementLines._text, mg.TotalQuantityIssued._text];
    sql = mysql.format(sql, inserts); 
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(true);
        });
    })
};



