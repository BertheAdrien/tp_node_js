var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
});

router.get('/age/:age/:connard', function(req, res, next) {
  res.render('age', { title: 'Ton age', age: req.params.age, connard: req.params.connard });
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
});

router.get('/chat', (req, res) => {
  res.render('chat', { title: 'Chat de fou' });
});

router.get('/dab', (req, res) => {
  if (!req.session.user) return res.redirect('/connexion'); 
  res.render('dab', { title: 'Distributeur' });
});

router.post('/connexion', function(req, res, next) {
  const { login, password } = req.body;

  if (login === 'admin' && password === 'admin') {
    req.session.user = {
      login: login
    };

    res.redirect('/dashboard');
  } else {
    res.render('connexion', {
      title: 'Connexion',
      error: 'Identifiants incorrects'
    });
  }
});

router.get('/dashboard', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/connexion'); // redirige si pas connecté
  }
  res.render('dashboard', { title: 'Dashboard' });
});

router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/connexion');
  });
});

module.exports = router;
