"use strict";

/**
 * Inserts a single line to the general_ledger_entries table of the database.
 *
 * @param {*} id
 * @return {Promise}
 */
module.exports = async function (gle) {
    let sql = "INSERT INTO general_ledger_entries VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [GeneralLedgerEntriesID, gle.NumberOfEntries._text, gle.TotalDebit._text, gle.TotalCredit._text];
    sql = mysql.format(sql, inserts); 
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(true);
        });
    })
};