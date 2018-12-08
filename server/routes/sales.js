var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
