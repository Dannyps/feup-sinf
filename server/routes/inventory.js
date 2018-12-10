var express = require('express');
var router = express.Router();

router.get('/stockunits', function(req, res, next) {
  
    var stockUnits = [
      {
        'month': 'Jan',
        'A': 80,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Feb',
        'A': 50,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Mar',
        'A': 40,
        'B': 20,
        'C': 50,
        'D': 10,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Apr',
        'A': 20,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 30,
        'F': 70,
      },
      {
        'month': 'May',
        'A': 30,
        'B': 40,
        'C': 90,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Jun',
        'A': 30,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Jul',
        'A': 40,
        'B': 40,
        'C': 50,
        'D': 30,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Aug',
        'A': 50,
        'B': 40,
        'C': 75,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Sep',
        'A': 70,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 40,
        'F': 70,
      },
      {
        'month': 'Oct',
        'A': 80,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Nov',
        'A': 40,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
      {
        'month': 'Dec',
        'A': 70,
        'B': 40,
        'C': 50,
        'D': 50,
        'E': 60,
        'F': 70,
      },
    ];
      res.json(stockUnits);
  });
  

module.exports = router;
