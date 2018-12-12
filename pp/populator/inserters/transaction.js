"use strict";

/**
 * Insert a transaction into the database
 *
 * @param {*} tr transaction
 * @param {*} jID the ID of the associated journal
 * @return {Promise}
 */
module.exports = function (tr, jID) {
    //console.log(tr);
    let sql = "INSERT INTO transaction (id, period, transaction_date, source_id, description, doc_archival_number, transaction_type, gl_posting_Date, supplier_id, customer_id, journal_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [tr.TransactionID._text, tr.Period._text, tr.TransactionDate._text, tr.SourceID._text, tr.Description._text, tr.DocArchivalNumber._text, tr.TransactionType._text, tr.GLPostingDate._text, null, null, jID];
    sql = mysql.format(sql, inserts);

    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        let tID = tr.TransactionID._text;
        if (typeof tr.Lines.CreditLine !== 'undefined') {
            if (Array.isArray(tr.Lines.CreditLine)) {
                tr.Lines.CreditLine.forEach(tr => {
                    ins.tCredit_line(tr, tID);
                });
            } else {
                ins.tCredit_line(tr.Lines.CreditLine, tID);
            }
        }

        if (typeof tr.Lines.DebitLine !== 'undefined') {
            if (Array.isArray(tr.Lines.DebitLine)) {
                tr.Lines.DebitLine.forEach(tr => {
                    ins.tDebit_line(tr, tID);
                });
            } else {
                ins.tDebit_line(tr.Lines.DebitLine, tID);
            }
        }

    })
};