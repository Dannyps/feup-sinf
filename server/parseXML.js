const XML = require('@rgrove/parse-xml');
const fs = require('fs');
const convert = require('xml-js');

var saft = fs.readFileSync('saft.xml', 'utf8');
var options = {compact: false, ignoreComment: true, spaces: 4};
var result = convert.xml2json(saft, options);

fs.writeFileSync('./saft.json', result , 'utf-8');