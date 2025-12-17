var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    const login = req.body.login;
    const password = req.body.password;

    const errorLoginMessage = "L'utilisateur ou le mot de passe n'existe pas"
    
    try{
        if (login !== 'admin') throw new Error(errorLoginMessage)
        if (password !== 'admin') throw new Error(errorLoginMessage)

        res.redirect(301, '/admin/dashboard');
    }catch(e){
       res.redirect(301, '/login', {
            error: e.message
        });
    }
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Dashboard' });
})
