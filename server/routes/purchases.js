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
        'year': 1870,
        'population': 5011310
    },
    {
        'year': 1890,
        'population': 6009351
    },
    {
        'year': 1910,
        'population': 7612114
    },
    {
        'year': 1930,
        'population': 8685109
    },
    {
        'year': 1949,
        'population': 9204799
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
