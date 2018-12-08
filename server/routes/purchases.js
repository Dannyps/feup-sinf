var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var cityData = [
    {
        'cityName': 'Debrecen',
        'population': 237888,
        'income': 135430
    },
    {
        'cityName': 'Miskolc',
        'population': 216470,
        'income': 151102
    }
  ];

  res.json(cityData);

});


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

router.get('/filter', function(req, res, next) {

  var list = [
    {
      name: "list1",
      description: "a simple example list"
    },
    {
      name: "list2",
      description: "another example list"
    },
    {
      name: "list3",
      description: "yet another"
    },
  ];
  res.json(list);
  console.log('Sent list of items');
});

module.exports = router;
