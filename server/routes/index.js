var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/info', function(req, res, next) {
  con.query("SELECT * FROM header", function (err, result) {
    res.json(result[0]);
  });
});

module.exports = router;
