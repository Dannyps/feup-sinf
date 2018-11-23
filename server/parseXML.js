const XML = require('@rgrove/parse-xml');
const fs = require('fs');

var contents = fs.readFileSync('saft.xml', 'utf8');

var saft = XML(contents);

//console.log(JSON.stringify(saft, null, 4));
fs.writeFileSync('./data.json', JSON.stringify(saft, null, 4) , 'utf-8');