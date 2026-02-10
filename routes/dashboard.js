const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('dashboard_login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    req.session.username = username;
    res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/dashboard/login');
});

router.get('/', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/dashboard/login');
    }
    res.render('dashboard', { username: req.session.username });
});

module.exports = router;