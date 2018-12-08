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
