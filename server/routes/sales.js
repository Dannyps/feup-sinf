var express = require('express');
var router = express.Router();

/* GET sales by country listing. */
router.get('/countrysales', function(req, res, next) {
    var salesByCountry = [
      {
        country: "Germany",
        sales: 200
      },
      {
        country: "United States",
        sales: 300
      },
      {
        country: "Spain",
        sales: 300
      },
      {
        country: "Portugal",
        sales: 400
      },
      {
        country: "Russia",
        sales: 150
      },
      {
        country: "Japan",
        sales: 100
      },

    ];
    res.json(salesByCountry);
  });

router.get('/productsales', function(req, res, next) {

  var productSales = [
    {
        'year': 2013,
        'A': 120,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
    },
    {
        'year': 2014,
        'A': 110,
        'B': 30,
        'C': 80,
        'D': 50,
        'E': 60,
        'F': 70,
    },
    {
        'year': 2015,
        'A': 70,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
    },
    {
        'year': 2016,
        'A': 110,
        'B': 130,
        'C': 90,
        'D': 50,
        'E': 60,
        'F': 70,
    },
    {
        'year': 2017,
        'A': 110,
        'B': 70,
        'C': 60,
        'D': 50,
        'E': 60,
        'F': 70,
    }
  ];
    res.json(productSales);
});


router.get('/totalsales', function(req, res, next) {
    
      var totalSales = [
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
    res.json(totalSales);
});


/* GET purchases volume. */
router.get('/bestsellers', function(req, res, next) {
  
  var volume = [
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
    res.json(volume);

  });


module.exports = router;
