var express = require('express');
var router = express.Router();

/* GET equity values. */
router.get('/equity', function (req, res, next) {

    con.query("select round(sum(closing_debit_balance) - sum(closing_credit_balance), 2) as CP from account where length(id) = 2", function (err, result) {
        res.json(result[0].CP);
    });

});


/* GET liability values. */
router.get('/assets', function (req, res, next) {
    con.query("select round(sum(closing_debit_balance), 2) as CP from account where length(id) = 2", function (err, result) {
        res.json(result[0].CP);
    });
});

/* GET asset values. */
router.get('/liability', function (req, res, next) {
    con.query("select round(sum(closing_credit_balance), 2) as CP from account where length(id) = 2", function (err, result) {
        res.json(result[0].CP);
    });
});

/* GET cash values (cash balance). */
router.get('/cashbalance', function (req, res, next) {

    con.query("select sum(closing_debit_balance)-sum(closing_credit_balance) as balance from account where id like \"1%\" and LENGTH(id) = 2", function (err, result) {
        res.json(result[0].balance);
    });
});

router.get('/accountsReceivable', function (req, res, next) {
    con.query("SELECT closing_debit_balance-closing_credit_balance as value, account_description as client FROM Account WHERE id LIKE '2111%' AND id != 2111", function (err, result) {
        res.json(result);
    });
});

router.get('/accountsPayable', function (req, res, next) {
    con.query("SELECT closing_credit_balance-closing_debit_balance as value, account_description as supplier FROM Account WHERE id LIKE '2211%' AND id != 2211", function (err, result) {
        res.json(result);
    });
});


module.exports = router;