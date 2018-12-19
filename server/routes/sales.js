var express = require('express');
var router = express.Router();

/* GET sales by country listing. */
router.get('/countrysales', function (req, res, next) {


  var salesByCountry = con.query("SELECT country, SUM( document_totals_net_total) AS sales  FROM sinf.invoice AS i INNER JOIN sinf.ship_to AS st  ON i.ship_to_id = st.id INNER JOIN sinf.address AS a ON st.address_id = a.id GROUP BY country", function (err, result) {
    res.json(result);
  });

});

router.get('/productsales', function (req, res, next) {




  var productSales = [{
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


router.get('/totalsales', function (req, res, next) {

  con.query("select MONTH(ds_invoice_status_date) as month, sum(document_totals_net_total) as `value` from invoice group by month", function (err, result) {
    var totalSales = [];
    result.forEach(res => {
      totalSales.push({
        'month': months[res.month],
        'value': res.value
      })
    });
    res.json(totalSales);
  });


});


/* GET purchases volume. */
router.get('/bestsellers', function (req, res, next) {

  var salesByCountry = con.query("SELECT product_code_id AS product, quantity, MONTH(tax_point_date) AS month FROM sinf.line WHERE tax_point_date IS NOT NULL group by month(tax_point_date), product_code_id", function (err, result) {
    var month = 'year';

    let vol = [];
    result.forEach(elem => {
      if (vol[elem.month] === undefined) {
        vol[elem.month] = [];
      }
    });
    result.forEach(elem => {
      var prodName = elem.product;
      var prodQuant = elem.quantity;
      var prodMonth = elem.month;
      vol[prodMonth].push({ [prodName]: prodQuant });

    });

    let ret = [];
    vol.forEach((elem, index) => {
      if (elem != null) {
        let aux = {};
        aux[month] = index;
        elem.forEach(line => {
          let prodName = Object.keys(line)[0];
          let prodQuant = line[prodName];
          aux[prodName] = prodQuant;
        });
        ret.push(aux);
      }

    });

    res.json(ret);
  });



});

/* GET purchases volume. */
router.get('/salesbycustomer', function (req, res, next) {

  var salesByCustomer = [{
    'customer': 'Customer A',
    'value': 70000,
  },
  {
    'customer': 'Customer B',
    'value': 30000,
  },
  {
    'customer': 'Customer C',
    'value': 50000,
  },
  ];
  res.json(volume);

});


/* GET best consumers. */
router.get('/bestconsumers', function (req, res, next) {
  let sql = "SELECT account_description, sum(closing_debit_balance) - sum(closing_credit_balance) as balance FROM account\
  WHERE  (id LIKE '2111%' /*nacional*/\
  OR id LIKE '2112%') /*internacional*/\
  AND id != '2111' AND id != '2112'\
  group by account_description\
  order by balance desc\
  limit 4"
  con.query(sql, function (err, result) {
    console.log(result);
    res.json(result);
  });

});


module.exports = router;