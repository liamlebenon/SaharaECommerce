const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    // Handle with Passport.js    
    console.log(`User logged out`);
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/');
    });
    
});
 
module.exports = router;