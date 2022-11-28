const express = require('express');
const router = express.Router();
const { pool, query } = require('../db');
const bcrypt = require('bcrypt');
const link = 'http://localhost:3000';

router.post('/', async (req, res, next) => {
    const { username, email, password, confirmPassword, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if password matched the confirm
    if (password !== confirmPassword || password.length < 8) {
        res.redirect(`${link}/signup`);
    } else {
        // Access the user Database
        pool.query(
            'INSERT INTO users (username, email, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5)',
            [ username, email, hashedPassword, firstname, lastname ],
            (error, results) => {
                // Redirect user to the signup page if there is an error
                if (error) {
                    console.log(error)
                    res.redirect(`${link}/signup`);
                } else {
                    res.status(201).redirect(`${link}/login`);
                    console.log(`User ${username} was created!`);
                    res.end();
                }
            }
        );
    }
});

module.exports = router;