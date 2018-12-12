"use strict";

/**
 * Insert a stock Movement into the database
 *
 * @param {*} sm Stock Movement
 * @return {Promise}
 */
module.exports = function (sm) {
    // let GroupingCode, TaxonomyCode;
    // GroupingCode = (acc.GroupingCode == undefined ? null : acc.GroupingCode._text);
    // let TransactionID = (i.TransactionID == undefined ? null : i.TransactionID._text);

    let sql = "INSERT INTO stock_movement (document_number, atcud, document_status_id, hash, hash_control, period, movement_date, movement_type, system_entry_date, customer_id, source_id, ship_to_id, ship_from_id, movement_start_time, movement_of_goods_id, document_totals_tax_payable, document_totals_net_total, document_totals_gross_total, movement_of_goods_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE document_number=document_number";
    let inserts = [sm.DocumentNumber._text, sm.ATCUD._text, null, sm.Hash._text, sm.HashControl._text, sm.Period._text, sm.MovementDate._text, sm.MovementType._text, sm.SystemEntryDate._text, null, sm.SourceID._text, null, null, sm.MovementStartTime._text, null, sm.DocumentTotals.TaxPayable._text, i.DocumentTotals.NetTotal._text, i.DocumentTotals.GrossTotal._text,MovementGoodsID];
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
