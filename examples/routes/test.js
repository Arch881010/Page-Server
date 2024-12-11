// This is an example of a route file.
// This is required for EVERY FILE in the routes folder.
const router = require('express').Router();

// See why.js if you really want to see a broken down example
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/2', (req, res) => {
    res.send('Hello World 2!');
});

module.exports = {
    "router": router,
    "path": "/test"
};