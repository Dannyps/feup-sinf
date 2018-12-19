var express = require('express');
var router = express.Router();

/* GET purchases volume. */
router.get('/volume', function (req, res, next) {

  var volume = [
    {
      'year': 2013,
      'value': 11000
    },
    {
      'year': 2014,
      'value': 13000
    },
    {
      'year': 2015,
      'value': 10000
    },
    {
      'year': 2016,
      'value': 11000
    },
    {
      'year': 2017,
      'value': 12000
    }
  ];
  res.json(volume);
});

/* GET purchases by country listing. */
router.get('/countrypurchases', function (req, res, next) {
  var salesByCountry = con.query("SELECT country, Sum(credit_amount) AS purchases FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id INNER JOIN sinf.address AS a ON sup.billing_address = a.id GROUP BY country", function (err, result) {
    res.json(result);
  });
});

/* GET total expenses for each supplier. */
router.get('/suppliertotal', function (req, res, next) {

  var salesByCountry = con.query("SELECT company_name AS supplier, sum(credit_amount) AS value FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id GROUP BY company_name ORDER BY value DESC", function (err, result) {
    res.json(result);
  });
  

});

module.exports = router;
