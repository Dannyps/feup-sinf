"use strict";

/**
 * Inserts a single line to the general_ledger_accounts table of the database.
 *
 * @param {*} id
 * @return {int} the id of the inserted line.
 */
module.exports = async function (taxonomyReference) {

    let sql = "INSERT INTO general_ledger_accounts VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [GeneralLedgerAcountsID, taxonomyReference, MastersFilesDefaultID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result.insertId);
        });
    })
};