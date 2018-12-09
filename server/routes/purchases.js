var express = require('express');
var router = express.Router();

/* GET purchases volume. */
router.get('/volume', function(req, res, next) {
  
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



/* GET total expenses for each supplier. */
router.get('/suppliertotal', function(req, res, next) {

  var supplierExpenses = [
    {
        'year': 2013,
        'A': 120,
        'B': 40,
        'C': 50,
    },
    {
        'year': 2014,
        'A': 110,
        'B': 30,
        'C': 80,
    },
    {
        'year': 2015,
        'A': 70,
        'B': 40,
        'C': 50,
    },
    {
        'year': 2016,
        'A': 110,
        'B': 130,
        'C': 90,
    },
    {
        'year': 2017,
        'A': 110,
        'B': 70,
        'C': 60,
    }
  ];
  res.json(supplierExpenses);
});

module.exports = router;
