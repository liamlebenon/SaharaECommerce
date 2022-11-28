const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', 
  passport.authenticate('local', { failureRedirect: '/fail', failureMessage: true }),
  function(req, res) {
    res.redirect('http://localhost:3000/profile');
});


module.exports = router;