"use strict";

const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
const requireDir = require('require-dir');

const ins = requireDir(__dirname + '/insertors')


function _flog(v) {
	console.log(util.inspect(v, false, null, true));
}

var text = fs.readFileSync('parser/saft.json', 'utf8')
let saft = JSON.parse(text);


global.con = mysql.createConnection({
	host: "rr.dannyps.net",
	user: "sinf",
	password: "MJwaIGQCBwO3MWlj",
	database: "sinf"
});


con.connect(function (err) {
	if (err) throw err;
	start();
});


/**
 * start loading the file to the database
 *
 */
function start() {
	saft.AuditFile.MasterFiles.Product.forEach(product => {
		ins.product(product);
		process.exit();
	});


	// saft.AuditFile.SourceDocuments.SalesInvoices.Invoice.forEach(invoice => {
	// 	invoice.Line.forEach(line => {
	// 		//_flog(line);
	// 		insertLine(line);
	// 		process.exit();
	// 	});
	// });
}



// console.log(saft.AuditFile.SourceDocuments.SalesInvoices.Invoice);




/*

var sql = "show tables;";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
	});
	
*/