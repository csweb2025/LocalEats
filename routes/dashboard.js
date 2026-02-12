const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/Account');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('dashboard_login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const account = await Account.findOne({ username });

  if (!account) {
    return res.render('dashboard_login', { error: "Credențiale invalide" });
  }

  const isMatch = await bcrypt.compare(password, account.passwordHash);

  if (!isMatch) {
    return res.render('dashboard_login', { error: "Credențiale invalide" });
  }

  const token = jwt.sign(
    {
      accountId: account._id,
      restaurantId: account.restaurantId
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.redirect("/dashboard");
});

router.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.redirect("/dashboard/login");
});

router.get('/', auth, async (req, res) => {
  const account = await Account.findById(req.user.accountId).populate('restaurantId');

  res.render('dashboard', {
    username: account.username,
    restaurantName: account.restaurantId.name
  });
});

module.exports = router;