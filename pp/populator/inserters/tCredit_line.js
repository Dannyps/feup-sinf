"use strict";

/**
 * Insert a credit_line into the database
 *
 * @param {*} l line
 * @param {*} tID the ID of the Transaction this line belongs to
 * @return {Promise}
 */
module.exports = function (l, tID) {
    let sql = "INSERT INTO credit_line VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [null, l.RecordID._text, l.AccountID._text, l.SourceDocumentID._text, l.SystemEntryDate._text, l.Description._text, l.CreditAmount._text, tID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            resolve(true);
        });
    })
};