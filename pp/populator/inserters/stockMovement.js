"use strict";

/**
 * Insert a stock Movement into the database
 *
 * @param {*} sm Stock Movement
 * @return {Promise}
 */
module.exports = function (sm) {
    addAddresses(sm).then(addrIDs => {
        let stID = addrIDs[0];
        let sfID = addrIDs[1];

        let sql = "INSERT INTO stock_movement (document_number, atcud, ds_movement_status, ds_movement_status_date, ds_source_id, ds_source_billing, hash, hash_control, period, movement_date, movement_type, system_entry_date, customer_id, source_id, ship_to_id, ship_from_id, movement_start_time, movement_of_goods_id, document_totals_tax_payable, document_totals_net_total, document_totals_gross_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE document_number=document_number";
        let inserts = [sm.DocumentNumber._text, sm.ATCUD._text, sm.DocumentStatus.MovementStatus._text, sm.DocumentStatus.MovementStatusDate._text, sm.DocumentStatus.SourceID._text, sm.DocumentStatus.SourceBilling._text, sm.Hash._text, sm.HashControl._text, sm.Period._text, sm.MovementDate._text, sm.MovementType._text, sm.SystemEntryDate._text, sm.CustomerID._text, sm.SourceID._text, stID, sfID, sm.MovementStartTime._text, MovementGoodsID, sm.DocumentTotals.TaxPayable._text, sm.DocumentTotals.NetTotal._text, sm.DocumentTotals.GrossTotal._text];
        sql = mysql.format(sql, inserts);

        return new Promise(function (resolve, reject) {
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(sql);
                    throw err;
                }
                // insert each line
                if (typeof sm.Line !== 'undefined') {
                    if (Array.isArray(sm.Line)) {
                        sm.Line.forEach(line => {
                            ins.line(line, null, sm.DocumentNumber._text);
                        });
                    } else {
                        ins.line(sm.Line, null, sm.DocumentNumber._text);
                    }
                }
                resolve(true);
            });
        })
    });
};


/**
 * 
 * @param {*} sm Stock Movement
 * @return {Promise} with the ids of both the ship to and the ship from, by this order.
 */
function addAddresses(sm) {
    return new Promise(function (resolve, error) {
        let pst = ins.address(sm.ShipTo.Address);
        let psf = ins.address(sm.ShipFrom.Address);

        Promise.all([pst, psf]).then(addrIDs => {
            let stAID = addrIDs[0];
            let sfAID = addrIDs[1];
            resolve(addShips(sm, stAID, sfAID));
        });
    })
}

/**
 * 
 * @param {*} sm Stock Movement
 * @param {*} stAID ship to adress ID 
 * @param {*} sfAID ship from adress ID
 * @return {Promise} with the ids of both the ship to address and the ship from address, by this order.
 */
function addShips(sm, stAID, sfAID) {
    return new Promise(function (resolve, error) {
        let pst = ins.ship_to(sm.ShipTo, stAID);
        let psf = ins.ship_from(sm.ShipFrom, sfAID);

        Promise.all([pst, psf]).then(addrIDs => {
            let stID = addrIDs[0];
            let sfID = addrIDs[1];
            resolve([stID, sfID]);
        });
    })
}