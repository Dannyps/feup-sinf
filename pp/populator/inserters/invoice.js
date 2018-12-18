"use strict";

/**
 * Insert an invoice into the database
 *
 * @param {*} i invoice
 * @return {Promise}
 */
module.exports = function (i) {

    addAddresses(i).then(addrIDs => {
        let stID = addrIDs[0];
        let sfID = addrIDs[1];

        let TransactionID = (i.TransactionID == undefined ? null : i.TransactionID._text);

        let sql = "INSERT INTO invoice (invoice_number, atcud, ds_invoice_status, ds_invoice_status_date, ds_source_billing, ds_source_id, hash, hash_control, period, invoice_date, invoice_type, source_id, system_entry_date, customer_id, transaction_id, ship_to_id, ship_from_id, movement_start_time, document_totals_tax_payable, document_totals_net_total, document_totals_gross_total, whithholding_tax_ammount, sales_invoices_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE invoice_number=invoice_number";
        let inserts = [i.InvoiceNo._text, i.ATCUD._text, i.DocumentStatus.InvoiceStatus._text, i.DocumentStatus.InvoiceStatusDate._text, i.DocumentStatus.SourceID._text, i.DocumentStatus.SourceBilling._text, i.Hash._text, i.HashControl._text, i.Period._text, i.InvoiceDate._text, i.InvoiceType._text, i.SourceID._text, i.SystemEntryDate._text, i.CustomerID._text, TransactionID, stID, sfID, i.MovementStartTime._text, i.DocumentTotals.TaxPayable._text, i.DocumentTotals.NetTotal._text, i.DocumentTotals.GrossTotal._text, i.WithholdingTax.WithholdingTaxAmount._text, SalesInvoicesID];
        sql = mysql.format(sql, inserts);
        return new Promise(function (resolve, reject) {
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(sql);
                    throw err;
                }
                // insert each line
                if (typeof i.Line !== 'undefined') {
                    if (Array.isArray(i.Line)) {
                        i.Line.forEach(line => {
                            ins.line(line, i.InvoiceNo._text, null);
                        });
                    } else {
                        ins.line(i.Line, i.InvoiceNo._text, null);
                    }
                }
                resolve(true);
            });
        });;

    });
};


/**
 * 
 * @param {*} i invoice 
 * @return {Promise} with the ids of both the ship to and the ship from, by this order.
 */
function addAddresses(i) {
    return new Promise(function (resolve, error) {
        let pst = ins.address(i.ShipTo.Address);
        let psf = ins.address(i.ShipFrom.Address);

        Promise.all([pst, psf]).then(addrIDs => {
            let stAID = addrIDs[0];
            let sfAID = addrIDs[1];
            resolve(addShips(i, stAID, sfAID));
        });
    })
}

/**
 * 
 * @param {*} i invoice 
 * @param {*} stAID ship to adress ID 
 * @param {*} sfAID ship from adress ID
 * @return {Promise} with the ids of both the ship to address and the ship from address, by this order.
 */
function addShips(i, stAID, sfAID) {
    return new Promise(function (resolve, error) {
        let pst = ins.ship_to(i.ShipTo, stAID);
        let psf = ins.ship_from(i.ShipFrom, sfAID);

        Promise.all([pst, psf]).then(addrIDs => {
            let stID = addrIDs[0];
            let sfID = addrIDs[1];
            resolve([stID, sfID]);
        });
    })
}