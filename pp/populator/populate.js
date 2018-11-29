"use strict";

global.mysql = require('mysql');
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
	database: "sinf",
	charset: "utf8"
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
	global.MastersFilesDefaultID = 1;
	ins.masterFilesId(MastersFilesDefaultID).then(MFid => {
		// mastersfile has been created with id <MDid>.
		if (MFid != MastersFilesDefaultID)
			// insert products
			saft.AuditFile.MasterFiles.Product.forEach(product => {
				ins.product(product);
			});
			// insert suppliers
	});
}
