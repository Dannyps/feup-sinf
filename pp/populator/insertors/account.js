"use strict";

/**
 * Insert an account into the database
 *
 * @param {*} acc product
 * @return {Promise}
 */
module.exports = function (acc) {
    let GroupingCode, TaxonomyCode;
    GroupingCode = (acc.GroupingCode == undefined ? null : acc.GroupingCode._text);
    TaxonomyCode = (acc.TaxonomyCode == undefined ? null : acc.TaxonomyCode._text);

    let sql = "INSERT INTO account (id, account_description, opening_debit_balance, opening_credit_balance, closing_debit_balance, closing_credit_balance, grouping_category, grouping_code, taxonomy_code, general_ledger_Accounts_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";
    let inserts = [acc.AccountID._text, acc.AccountDescription._text, acc.OpeningDebitBalance._text, acc.OpeningCreditBalance._text, acc.ClosingDebitBalance._text, acc.ClosingCreditBalance._text, acc.GroupingCategory._text, GroupingCode, TaxonomyCode, GeneralLedgerAcountsID];
    sql = mysql.format(sql, inserts);
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, result) {
            if (err){
                throw err;
            }
            resolve(true);
        });
    })
};