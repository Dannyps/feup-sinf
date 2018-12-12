"use strict";

/**
 * Insert a journal into the database
 *
 * @param {*} j journal
 * @return {Promise}
 */
module.exports = function (j) {
    let sql = "INSERT INTO journal VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [j.JournalID._text, j.Description._text, GeneralLedgerEntriesID];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        return new Promise(function (resolve, reject) {
            if (err) {
                throw err;
            }
            // insert each transaction
            if (typeof j.Transaction !== 'undefined') {
                if (Array.isArray(j.Transaction)) {
                    j.Transaction.forEach(tr => {
                        ins.transaction(tr, j.JournalID._text);
                    });
                } else {
                    ins.transaction(j.Transaction, j.JournalID._text);
                }
            }
            resolve(true);
        });
    })
};