var express = require('express');
var router = express.Router();

/* GET equity values. */
router.get('/equity', function (req, res, next) {

    var equity = [{
            'year': 2013,
            'value': 50000
        },
        {
            'year': 2014,
            'value': 60000
        },
        {
            'year': 2015,
            'value': 30000
        },
        {
            'year': 2016,
            'value': 25000
        },
        {
            'year': 2017,
            'value': 60000
        }
    ];
    res.json(equity);
});


/* GET liability values. */
router.get('/liability', function (req, res, next) {

    var liability = [{
            'year': 2013,
            'value': 25000
        },
        {
            'year': 2014,
            'value': 22000
        },
        {
            'year': 2015,
            'value': 28000
        },
        {
            'year': 2016,
            'value': 34000
        },
        {
            'year': 2017,
            'value': 17000
        }
    ];
    res.json(liability);
});

/* GET asset values. */
router.get('/assets', function (req, res, next) {

    var assets = [{
            'year': 2013,
            'value': 22000
        },
        {
            'year': 2014,
            'value': 33000
        },
        {
            'year': 2015,
            'value': 18000
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
    res.json(assets);
});

/* GET cash values (cash balance). */
router.get('/cashbalance', function (req, res, next) {

    con.query("select sum(closing_debit_balance)-sum(closing_credit_balance) as balance from account where id like \"1%\" and LENGTH(id) = 2", function (err, result) {
        res.json(result[0].balance);
    });
});

  router.get('/accountsReceivable', function(req, res, next) {
    
    var accountsReceivable = [
      {
          'client': 'Client 1',
          'value': 11000
      },
      {
          'client': 'Client 2',
          'value': 13000
      },
      {
          'client': 'Client 3',
          'value': 10000
      },
    ];
    res.json(accountsReceivable);
  });
  
  router.get('/accountsPayable', function(req, res, next) {
    
    var accountsReceivable = [
      {
          'supplier': 'Supplier 1',
          'value': 4000
      },
      {
          'supplier': 'Supplier 2',
          'value': 15000
      },
      {
          'supplier': 'Supplier 3',
          'value': 23000
      },
      {
          'supplier': 'Supplier 4',
          'value': 9000
      },
    ];
    res.json(accountsReceivable);
  });


module.exports = router;