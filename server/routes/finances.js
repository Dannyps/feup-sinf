var express = require('express');
var router = express.Router();

/* GET equity values. */
router.get('/equity', function(req, res, next) {
  
  var equity = [
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
  res.json(equity);
});


/* GET liability values. */
router.get('/liability', function(req, res, next) {
  
  var liability = [
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
  res.json(liability);
});

/* GET asset values. */
router.get('/assets', function(req, res, next) {
  
  var assets = [
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
  res.json(assets);
});

/* GET cash values (cash balance). */
router.get('/cashbalance', function(req, res, next) {
    
    var cashBalance = [
      {
          'month': 'Jan',
          'value': 11000
      },
      {
          'month': 'Fev',
          'value': 13000
      },
      {
          'month': 'Mar',
          'value': 10000
      },
    ];
    res.json(cashBalance);
  });


module.exports = router;
