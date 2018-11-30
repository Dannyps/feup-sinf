"use strict";

/**
 * Insert an addresss into the database
 *
 * @param {*} address
 * @return {Promise} with the id of the inserted address.
 */
module.exports = function (address) {
    let sql = "INSERT IGNORE INTO address (address_detail, city, postal_code, country) VALUES (?, ?, ?, ?)";
    let inserts = [address.AddressDetail._text, address.City._text, address.PostalCode._text, address.Country._text];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.insertId == 0) {
                // no row was inserted.
                let sql = "SELECT id FROM address WHERE address_detail=? and city=? and postal_code=? and country=?";
                let inserts = [address.AddressDetail._text, address.City._text, address.PostalCode._text, address.Country._text];
                sql = mysql.format(sql, inserts);
                con.query(sql, function (err, res) {
                    resolve(res[0].id)
                });
            } else {
                resolve(result.insertId);
            }

        });
    });
};