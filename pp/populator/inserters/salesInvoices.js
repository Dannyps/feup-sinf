"use strict";

/**
 * Inserts a single line to the sales_invoices table of the database.
 *
 * @param {*} id
 * @return {Promise}
 */
module.exports = async function (si) {
    let sql = "INSERT INTO sales_invoices VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [SalesInvoicesID, si.NumberOfEntries._text, si.TotalDebit._text, si.TotalCredit._text];
    sql = mysql.format(sql, inserts); 
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(true);
        });
    })
};