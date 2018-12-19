var express = require('express');
var regression = require('regression');
var router = express.Router();

/* GET purchases volume. */
router.get('/volume', function (req, res, next) {


  con.query("SELECT SUM(credit_amount) AS value, month(transaction_date) AS month FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id  INNER JOIN sinf.transaction AS t ON t.id = cl.transaction_id group by month(transaction_date)", function (err, result) {
    for (let i = 1; i <= 12; i++) {
      let isMember = false;
      for (elem in result){
        console.log(i + "  " + elem);
        if (result[elem].month == i) {
          isMember = true;
          break;
        }
      }
      if(!isMember)  
        result.push({"value":0,"month":i});
    }

    result.sort(comparePurchases);
    res.json(result);
  });

});

/* GET purchases by country listing. */
router.get('/countrypurchases', function (req, res, next) {
  var salesByCountry = con.query("SELECT country, Sum(credit_amount) AS purchases FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id INNER JOIN sinf.address AS a ON sup.billing_address = a.id GROUP BY country", function (err, result) {
    res.json(result);
  });
});


router.get('/growth', function (req, res, next) {
  con.query("SELECT SUM(credit_amount) AS value, month(transaction_date) AS month FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id  INNER JOIN sinf.transaction AS t ON t.id = cl.transaction_id group by month(transaction_date)", function (err, result) {   
    res.json(result);
  });
});

/* GET total expenses for each supplier. */
router.get('/suppliertotal', function (req, res, next) {

  var salesByCountry = con.query("SELECT company_name AS supplier, round(sum(credit_amount),2) AS value FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id GROUP BY company_name ORDER BY value DESC", function (err, result) {
    res.json(result);
  });
});


function comparePurchases(a,b) {
  if (a.month < b.month)
    return -1;
  if (a.month > b.month)
    return 1;
  return 0;
}


module.exports = router;
