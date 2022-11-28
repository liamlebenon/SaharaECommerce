const express = require('express');
const router = express.Router();
const { pool, query } = require('../db');

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM products ORDER BY id ASC', (error, results) => {
            if (error) {
                res.send(error.message);
            }
            res.status(200).json(results.rows);
            console.log('Session: ', req.session)
            console.log('Products sent!');
        }
    );
});

router.get('/:productId', (req, res) => {
    console.log('Req.params: ', req.params)
    const productId = req.params.productId;
    pool.query(
        'SELECT * FROM products WHERE id = $1',
        [productId],
        (error, results) => {
            if (error) {
                res.send(error.message);
            }
            res.status(200).json(results.rows);
        }
    )
});

router.post('/', (req, res) => {
    const { id, name, description, price, image, seller } = req.body;
    pool.query(
        'INSERT INTO products (id, name, description, price, image, seller) VALUES ($1, $2, $3, $4, $5, $6)',
        [ id, name, description, price, image, seller ],
        (error, results) => {
            if (error) {
                res.send(error.message);
            }
            res.status(201).json(results.rows);
        }
    );
});

module.exports = router;