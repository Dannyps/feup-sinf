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
    //console.log(tr);
    let IECAmount, stockMovementID, invoiceID, orderRefOriginatingOn, orderRefOrderDate;
    IECAmount = (ln.CustomsInformation == undefined ? null :ln.CustomsInformation.IECAmount._text);
    stockMovementID = smID;
    invoiceID = iID;
    orderRefOriginatingOn = (ln.OrderReferences == undefined ? null :ln.OrderReferences.OriginatingON._text);
    orderRefOrderDate = (ln.OrderReferences == undefined ? null :ln.OrderReferences.OrderDate._text);

    let sql = "INSERT INTO line (line_number, product_code_id, quantity, unit_of_measure, unit_price, tax_point_date, description, credit_amount, tax_id, settlement_amount, iec_amount, arc_no, stock_movement_id, invoice_id, order_ref_originating_on, order_ref_order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [ln.LineNumber._text, ln.ProductCode._text, ln.Quantity._text, ln.UnitOfMeasure._text, ln.UnitPrice._text, ln.TaxPointDate._text, ln.Description._text, ln.CreditAmount._text, null, ln.SettlementAmount._text, IECAmount, null, stockMovementID, invoiceID, orderRefOriginatingOn, orderRefOrderDate];
    sql = mysql.format(sql, inserts);

    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err){
                throw err;
            }
            resolve(true);
        });
    });
};

