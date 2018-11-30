"use strict";

/**
 * Insert a supplier into the database
 *
 * @param {*} sup supplier
 * @return {Promise}
 */
module.exports = function (sup) {

    addAddresses(sup).then(addrIDs => {
        let baID = addrIDs[1];
        let saID = addrIDs[0];

        return new Promise(function (resolve, reject) {

            let telephone = (sup.Telephone == undefined ? null : sup.Telephone._text);
            let fax = (sup.Fax == undefined ? null : sup.Fax._text);
            let website = (sup.Website == undefined ? null : sup.Website._text);

            let sql = "INSERT IGNORE INTO supplier (id, account_id, supplier_tax_id, company_name, billing_address, ship_from_address, telephone, fax, website, master_files_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let inserts = [sup.SupplierID._text, sup.AccountID._text, sup.SupplierTaxID._text, sup.CompanyName._text, baID, saID, telephone, fax, website, MastersFilesDefaultID];
            sql = mysql.format(sql, inserts);
            con.query(sql, function (err, result) {
                if (err) throw err;
                resolve(true);
            });
        });
    })
};

/**
 * 
 * @param {*} sup 
 * @return {Promise} with the ids of both the shipping address and the billing address, by this order.
 */
function addAddresses(sup) {
    return new Promise(function (resolve, error) {
        let pba = ins.address(sup.BillingAddress);
        let psa = ins.address(sup.ShipFromAddress);

        Promise.all([pba, psa]).then(addrIDs => {
            let saID = addrIDs[1];
            let baID = addrIDs[0];
            resolve([saID, baID]);
        });
    })
}