const express = require('express');
const router = express.Router();
const { pool, query} = require('../db');

// Get all users
router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM users ORDER BY id ASC', (error, results) => {

            if (error) {
                res.send(error.message);
            }
            res.status(200).json(results.rows);
            console.log('Users sent!');
        }
    );
});

// Get user by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query(
        'SELECT * FROM users WHERE id = $1',
        [ id ], (err, results) => {
            if (err) {
                res.send(err.message);
            }
            res.status(200).json(results.rows);
            console.log(`User ${id} sent!`);
        }
    );
});

module.exports = router;