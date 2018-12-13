"use strict";

/**
 * Insert a customer into the database
 *
 * @param {*} sup customer
 * @return {Promise}
 */
module.exports = function (c) {

    return addAddresses(c).then(addrIDs => {
        let baID = addrIDs[1];
        let saID = addrIDs[0];

        return new Promise(function (resolve, reject) {
            let AccountID = (c.AccountID._text == "Desconhecido" ? null : c.AccountID._text);

            let sql = "INSERT INTO customer (id, account_id, customer_tax_id, company_name, billing_address, ship_to_address, self_billing_indicator, master_files_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            let inserts = [c.CustomerID._text, AccountID, c.CustomerTaxID._text, c.CompanyName._text, baID, saID, c.SelfBillingIndicator._text, MastersFilesDefaultID];
            sql = mysql.format(sql, inserts);
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(sql);
                    throw err;}
                resolve(true);
            });
        });
    })
};

/**
 * 
 * @param {*} c 
 * @return {Promise} with the ids of both the shipping address and the billing address, by this order.
 */
function addAddresses(c) {
    return new Promise(function (resolve, error) {
        let pba = ins.address(c.BillingAddress);
        let psa = ins.address(c.ShipToAddress);

        Promise.all([pba, psa]).then(addrIDs => {
            let saID = addrIDs[1];
            let baID = addrIDs[0];
            resolve([saID, baID]);
        });
    })
}