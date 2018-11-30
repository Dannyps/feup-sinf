"use strict";

/**
 * Insert a supplier into the database
 *
 * @param {*} sup supplier
 * @return {Promise}
 */
module.exports = function (sup) {

    let { saID, baID } = addAddresses(sup);
/*

    return new Promise(function (resolve, reject) {
        let sql = "INSERT IGNORE INTO supplier (id, account_id, supplier_tax_id, company_name, billing_address, ship_from_address, telephone, fax, website, master_files_id) VALUES (?, ?, ?, ?)";
        let inserts = [saID, baID, _text, address.City._text, address.PostalCode._text, address.Country._text];
        sql = mysql.format(sql, inserts);
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(true);
        });
    });*/
};

/**
 * 
 * @param {*} sup 
 * @return {object} ids of both the shipping address and the billing address, by this order.
 */
function addAddresses(sup) {
    let pba = ins.address(sup.BillingAddress);
    let psa = ins.address(sup.ShipFromAddress);
    let saID, baID;
    Promise.all([pba, psa]).then(addrIDs => {
        saID = addrIDs[1];
        baID = addrIDs[0];
    });
    return { saID, baID };
}
