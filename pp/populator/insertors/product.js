"use strict";

/**
 * Insert a product into the database
 *
 * @param {*} p product
 * @return {Promise}
 */
module.exports = function (p) {
    let sql = "INSERT INTO product VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE product_code=product_code";
    let inserts = [p.ProductCode._text, p.ProductType._text, p.ProductGroup._text, p.ProductDescription._text, p.ProductNumberCode._text, MastersFilesDefaultID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(true);
        });
    })
};