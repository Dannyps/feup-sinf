var express = require('express');
var regression = require('regression');
var router = express.Router();

/* GET purchases volume. */
router.get('/volume', function (req, res, next) {

  let min, max;
  typeof req.query.m !== "undefined" ? min = req.query.m : min = 1;
  typeof req.query.m !== "undefined" ? max = req.query.M : max = 12;

  con.query("SELECT round(SUM(credit_amount),2) AS value, month(transaction_date) AS month FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id  INNER JOIN sinf.transaction AS t ON t.id = cl.transaction_id WHERE month(transaction_date) <= " + max + " and month(transaction_date) >= " + min + " group by month(transaction_date)", function (err, result) {
    for (let i = 1; i <= 12; i++) {
      let isMember = false;
      for (elem in result) {
        //console.log(i + "  " + elem);
        if (result[elem].month == i) {
          isMember = true;
          break;
        }
      }
      if (!isMember)
        result.push({
          "value": 0,
          "month": i
        });
    }

    result.sort(comparePurchases);
    res.json(result);
  });

});


router.get('/countrypurchases', function (req, res, next) {
  let min, max;
  typeof req.query.m !== "undefined" ? min = req.query.m : min = 1;
  typeof req.query.m !== "undefined" ? max = req.query.M : max = 12;

  con.query("SELECT country, Sum(credit_amount) AS purchases FROM sinf.credit_line AS cl INNER JOIN transaction on transaction_id = transaction.id INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id INNER JOIN sinf.address AS a ON sup.billing_address = a.id WHERE month(transaction_date) <= " + max + " and month(transaction_date) >= " + min + " GROUP BY country", function (err, result) {
    res.json(result);
  });
});


router.get('/growth', function (req, res, next) {
  let min, max;
  typeof req.query.m !== "undefined" ? min = req.query.m : min = 1;
  typeof req.query.m !== "undefined" ? max = req.query.M : max = 12;
  con.query("SELECT round(sum(credit_amount),2) AS value, month(transaction_date) as m FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id INNER JOIN transaction on cl.transaction_id = transaction.id group by month(transaction_date)", function (err, result) {
    let r = [];
    let foundM = 0,
      foundm = 0;
    result.forEach(e => {
      if (e.m == min) foundm = 1;
      if (e.m == max) foundM = 1;
      r[e.m] = e.value;
    });
    if (!(foundm && foundM)) {
      res.json("n/a");
    } else {
      res.json(((r[max]-r[min])/r[min]*100).toFixed(2) + "%");
    }

  });
});

/* GET total expenses for each supplier. */
router.get('/suppliertotal', function (req, res, next) {

  let min, max;
  typeof req.query.m !== "undefined" ? min = req.query.m : min = 1;
  typeof req.query.m !== "undefined" ? max = req.query.M : max = 12;
  con.query("SELECT company_name AS supplier, round(sum(credit_amount),2) AS value FROM sinf.credit_line AS cl INNER JOIN sinf.supplier AS sup ON cl.account_id = sup.account_id INNER JOIN transaction on cl.transaction_id = transaction.id WHERE month(transaction_date) <= " + max + " and month(transaction_date) >= " + min + " GROUP BY company_name ORDER BY value DESC", function (err, result) {
    res.json(result);
  });
});


function comparePurchases(a, b) {
  if (a.month < b.month)
    return -1;
  if (a.month > b.month)
    return 1;
  return 0;
}


module.exports = router;