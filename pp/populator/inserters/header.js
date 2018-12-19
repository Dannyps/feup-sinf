"use strict";

/**
 * Insert the header into the database
 *
 * @param {*} h header
 * @return {Promise}
 */
module.exports = function (h) {

    let AuditFileVersion = (h.AuditFileVersion == undefined ? null : h.AuditFileVersion._text);
    let CompanyID = (h.CompanyID == undefined ? null : h.CompanyID._text);
    let TaxRegistrationNumber = (h.TaxRegistrationNumber == undefined ? null : h.TaxRegistrationNumber._text);
    let TaxAccountingBasis = (h.TaxAccountingBasis == undefined ? null : h.TaxAccountingBasis._text);
    let CompanyName = (h.CompanyName == undefined ? null : h.CompanyName._text);
    let StreetName = (h.CompanyAddress.StreetName == undefined ? null : h.CompanyAddress.StreetName._text);
    let AddressDetail = (h.CompanyAddress.AddressDetail == undefined ? null : h.CompanyAddress.AddressDetail._text);
    let City = (h.CompanyAddress.City == undefined ? null : h.CompanyAddress.City._text);
    let PostalCode = (h.CompanyAddress.PostalCode == undefined ? null : h.CompanyAddress.PostalCode._text);
    let Country = (h.CompanyAddress.Country == undefined ? null : h.CompanyAddress.Country._text);
    let FiscalYear = (h.FiscalYear == undefined ? null : h.FiscalYear._text);
    let StartDate = (h.StartDate == undefined ? null : h.StartDate._text);
    let EndDate = (h.EndDate == undefined ? null : h.EndDate._text);
    let CurrencyCode = (h.CurrencyCode == undefined ? null : h.CurrencyCode._text);
    let DateCreated = (h.AuditFileVersion == undefined ? null : h.DateCreated._text);
    let TaxEntity = (h.TaxEntity == undefined ? null : h.TaxEntity._text);
    let ProductCompanyTaxID = (h.ProductCompanyTaxID == undefined ? null : h.ProductCompanyTaxID._text);
    let SoftwareCertificateNumber = (h.SoftwareCertificateNumber == undefined ? null : h.SoftwareCertificateNumber._text);
    let ProductID = (h.ProductID == undefined ? null : h.ProductID._text);
    let ProductVersion = (h.ProductVersion == undefined ? null : h.ProductVersion._text);

    let sql = "INSERT INTO header VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE tax_entity=tax_entity";
    let inserts = [AuditFileVersion, CompanyID, TaxRegistrationNumber, TaxAccountingBasis, CompanyName, StreetName, AddressDetail, AuditFileVersion, City, PostalCode, Country, FiscalYear, StartDate, EndDate, CurrencyCode, DateCreated, TaxEntity, ProductCompanyTaxID, SoftwareCertificateNumber, ProductID, ProductVersion];
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