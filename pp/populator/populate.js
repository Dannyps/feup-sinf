const mysql = require('mysql');
const fs = require('fs');

var text = fs.readFileSync('parser/saft.json','utf8')
let saft = JSON.parse(text);


saft.AuditFile.SourceDocuments.SalesInvoices.Invoice.forEach(invoice => {
    console.log(invoice);
    process.exit();
});

// console.log(saft.AuditFile.SourceDocuments.SalesInvoices.Invoice);

process.exit();

let con = mysql.createConnection({
  host: "rr.dannyps.net",
  user: "sinf",
  password: "MJwaIGQCBwO3MWlj",
  database: "sinf"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "show tables;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });


  

});