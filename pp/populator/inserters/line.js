"use strict";

/**
 * Insert a line into the database
 *
 * @param {*} ln line
 * @param {*} iID the ID of the associated invoice
 * @param {*} smID the ID of the associated stockMovement
 * @return {Promise}
 */
module.exports = function (ln, iID, smID) {

    ins.taxTableEntry(ln.Tax).then(taxID => {
        
        //console.log(ln);

        let IECAmount, stockMovementID, invoiceID, orderRefOriginatingOn, orderRefOrderDate, taxPointDate;
        IECAmount = (ln.CustomsInformation == undefined ? null : ln.CustomsInformation.IECAmount._text);
        stockMovementID = smID;
        invoiceID = iID;
        orderRefOriginatingOn = (ln.OrderReferences == undefined ? null : ln.OrderReferences.OriginatingON._text);
        orderRefOrderDate = (ln.OrderReferences == undefined ? null : ln.OrderReferences.OrderDate._text);
        taxPointDate = (ln.TaxPointDate == undefined ? null : ln.TaxPointDate._text);


        let sql = "INSERT INTO line (line_number, product_code_id, quantity, unit_of_measure, unit_price, tax_point_date, description, credit_amount, tax_id, settlement_amount, iec_amount, arc_no, stock_movement_id, invoice_id, order_ref_originating_on, order_ref_order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
        let inserts = [ln.LineNumber._text, ln.ProductCode._text, ln.Quantity._text, ln.UnitOfMeasure._text, ln.UnitPrice._text, taxPointDate, ln.Description._text, ln.CreditAmount._text, taxID, ln.SettlementAmount._text, IECAmount, null, stockMovementID, invoiceID, orderRefOriginatingOn, orderRefOrderDate];
        sql = mysql.format(sql, inserts);

        return new Promise(function (resolve, reject) {
            con.query(sql, function (err, result) {
                if (err) {
                    throw err;
                }
                resolve(true);
            });
        });

    });
};

