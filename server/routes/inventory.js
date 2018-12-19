var express = require('express');
var router = express.Router();

router.get('/stockunits', function (req, res, next) {

  var stockUnits = [{
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

router.get('/inventoryvalue', function (req, res, next) {

  con.query("SELECT closing_debit_balance - closing_credit_balance as balance from account where id = 31;", function (err, result) {
    var totalSales = [{
      'month': 'Jan',
      'value': result[0].balance
    }];
    res.json(totalSales);
  });
  /*var inventoryValue = [{
      'month': 'Jan',
      'value': 5000,
    },
    {
      'month': 'Feb',
      'value': 6000,
    },
    {
      'month': 'Mar',
      'value': 5000,
    },
  ];
  res.json(inventoryValue);*/
});

router.get('/overview', function (req, res, next) {

  // primavera.sqlQuery("SELECT TOP 5 Artigo, STKMinimo, STKMaximo, STKReposicao, STKActual, STKMinimo-STKActual as delta FROM Artigo WHERE STKMinimo > 0 ORDER BY delta DESC").then(data => {
  //   res.json(data);
  // });
  res.json([
    {
    Artigo: "MAN001",
    STKMinimo: 100,
    STKMaximo: 0,
    STKReposicao: 150,
    STKActual: 0,
    delta: 100
    },
    {
    Artigo: "B0007",
    STKMinimo: 20,
    STKMaximo: 40,
    STKReposicao: 28,
    STKActual: 2,
    delta: 18
    },
    {
    Artigo: "B0008",
    STKMinimo: 15,
    STKMaximo: 25,
    STKReposicao: 10,
    STKActual: 0,
    delta: 15
    },
    {
    Artigo: "CMP-RAM001.DDR2-2048",
    STKMinimo: 10,
    STKMaximo: 0,
    STKReposicao: 15,
    STKActual: -5,
    delta: 15
    },
    {
    Artigo: "CMP-RAM001.DDR2-512",
    STKMinimo: 10,
    STKMaximo: 0,
    STKReposicao: 15,
    STKActual: -3,
    delta: 13
    }
    ]);
});


module.exports = router;