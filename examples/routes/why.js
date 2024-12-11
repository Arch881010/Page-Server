// This is an example of a route file.
// This is required for EVERY FILE in the routes folder.

// Creats a new router object from express.js
const router = require('express').Router();

// This is a route. This handles the GET request to the root of the router.
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// This is another route. This handles the GET request to /2 on the router.
router.get('/2', (req, res) => {
    res.send('Hello World 2!');
});

// This is another route. This handles the POST request to the /2 on the router.
router.post('/2', (req, res) => {
    res.send('Hello World 2!');
});

// This is required for EVERY FILE in the routes folder.
// This can be two different things.
/*
1. a router object (from express.js)
ex:
module.exports = router;

2. a JSON object with two keys: "router" and "path" 
ex:
modules.export = {
    "router": router,
    "path": "/why"
};
*/

// Also do note that we have a path set here. This is where the router will be mounted.
// Meaning any requests to /why will be sent to this router, and the router will handle it.
// So these current routes are accessible from /why/1 and /why/2.

// If we left out the path, the router would be mounted to the root (/) of the server.
// Meaning if we had /1 or /2, the router would handle it instead.

module.exports = {
    "router": router,
    "path": "/why"
};