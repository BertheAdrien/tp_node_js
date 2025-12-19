var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('connexion', { title: 'Connexion' });
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
    req.session.user = { login };

    return res.redirect('/dashboard');
  }
  res.render('connexion', {
    title: 'Connexion',
    error: 'Utilisateur ou mot de passe incorrect'
  });
});


router.get('/dashboard', function(req, res) {
  if (!req.session.user) {
    return res.redirect('/connexion'); 
  }
  res.render('dashboard', { title: 'Dashboard' });
});

router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/connexion');
  });
});

module.exports = router;
