const XML = require('@rgrove/parse-xml');
const fs = require('fs');
const convert = require('xml-js');

var saft = fs.readFileSync('parser/saft.xml', 'latin1');
var options = {compact: true, ignoreComment: true, spaces: 4};
var result = convert.xml2json(saft, options);

fs.writeFileSync('parser/saft.json', result , 'utf-8');