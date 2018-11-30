"use strict";

global.mysql = require('mysql');
const fs = require('fs');
const util = require('util');
const requireDir = require('require-dir');

global.ins = requireDir(__dirname + '/insertors')


function _flog(v) {
	console.log(util.inspect(v, false, null, true));
}

var text = fs.readFileSync('parser/saft.json', 'utf8')
let saft = JSON.parse(text);


global.con = mysql.createConnection({
	host: "rr.dannyps.net",
	user: "sinf",
	password: "MJwaIGQCBwO3MWlj",
	database: "sinf",
	charset: "utf8"
});


con.connect(function (err) {
	if (err) throw err;
	start();
});

/*
con.connect(function (err) {
	if (err) throw err;
	truncateDatabase().then(_ => {
		console.log("start populating");
		start();
	});
});*/

/**
 * Truncate database
 */
function truncateDatabase() {
	return new Promise(function (ress, rej) {
		con.query("SET FOREIGN_KEY_CHECKS = 0;", function (err, res) {
			console.log("fornkeychecks off");
			con.query("show tables;", function (err, results) {
				if (err) throw err;
				let p = new Promise(function (resolve, reject) {
					results.forEach(res => {
						let tb = res.Tables_in_sinf;
						con.query('truncate table ' + tb, function (err, result) {
							console.log("truncated " + tb);
							if (err) throw err;
						});
					});
					resolve(true);
				});
				p.then(() => {
					new Promise(function (res, rej) {
						con.query("SET FOREIGN_KEY_CHECKS = 1;", function (err, res) {
							console.log("fornkeychecks on");
							ress(true);
						});
					});
				})
			})
		})
	});
}

/**
 * start loading the file to the database
 *
 */
function start() {
	global.MastersFilesDefaultID = 1;
	ins.masterFilesId(MastersFilesDefaultID).then(MFid => {
		// mastersfile has been created with id <MDid>.
		if (MFid != MastersFilesDefaultID)
			// insert products
			console.log("inserting products... ");
		saft.AuditFile.MasterFiles.Product.forEach(product => {
			ins.product(product);
		});
		console.log("inserting suppliers... ");
				
		// insert suppliers
		saft.AuditFile.MasterFiles.Supplier.forEach(sup => {
			ins.supplier(sup);
		});
	});
}