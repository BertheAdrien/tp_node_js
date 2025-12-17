var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/age/:age/:connard', function(req, res, next) {
  res.render('age', { title: 'Ton age', age: req.params.age, connard: req.params.connard });
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
});

module.exports = router;
