"use strict";

/**
 * Insert an invoice into the database
 *
 * @param {*} i invoice
 * @return {Promise}
 */
module.exports = function (i) {
    // let GroupingCode, TaxonomyCode;
    // GroupingCode = (acc.GroupingCode == undefined ? null : acc.GroupingCode._text);
    let TransactionID = (i.TransactionID == undefined ? null : i.TransactionID._text);

    let sql = "INSERT INTO invoice (invoice_number, atcud, document_status_id, hash, hash_control, period, invoice_date, invoice_type, source_id, system_entry_date, customer_id, transaction_id, ship_to_id, ship_from_id, movement_start_time, document_totals_tax_payable, document_totals_net_total, document_totals_gross_total, whithholding_tax_ammount, sales_invoices_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE invoice_number=invoice_number";
    let inserts = [i.InvoiceNo._text, i.ATCUD._text, null, i.Hash._text, i.HashControl._text, i.Period._text, i.InvoiceDate._text, i.InvoiceType._text, i.SourceID._text, i.SystemEntryDate._text, null, null, null, null, i.MovementStartTime._text, i.DocumentTotals.TaxPayable._text, i.DocumentTotals.NetTotal._text, i.DocumentTotals.GrossTotal._text, i.WithholdingTax.WithholdingTaxAmount._text, SalesInvoicesID];
    sql = mysql.format(sql, inserts);
    
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err){
                console.log(sql);
                throw err;
            }
            resolve(true);
        });
    })
};