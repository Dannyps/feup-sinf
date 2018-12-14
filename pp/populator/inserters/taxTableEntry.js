"use strict";

/**
 * Insert a taxTableEntry into the database
 *
 * @param {*} t taxTableEntry
 * @return {Promise} with the ID of the inserted row
 */

module.exports = function (t) {

    let taxDescription = (t.Description == undefined ? null : t.Description._text);

    let sql = "INSERT INTO tax_table_entry (tax_type, tax_country_region, tax_code, tax_percentage, tax_description, tax_table_id) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [t.TaxType._text, t.TaxCountryRegion._text, t.TaxCode._text, t.TaxPercentage._text, taxDescription, TaxTableID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result.insertId);
        });
    })
};