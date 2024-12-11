Hello! It seems you have seen the routes folder.

This folder is used for creating your own custom routes.

Simply follow the examples or just write a simple router in express.
You can find three examples:
- [why.js (handles /why/*)](../examples/routes/why.js)
- [test.js (handles /test/*)](../examples/routes/test.js)
- [tests.js (some tests that I use during testing of my own (for sql))](../examples/routes/tests.js)

PLEASE remember that you need to expore a router regardless of what way you pick.

For empty files (if you want it to handle stuff on root (/))
```js
const router = require('express').Router();

module.exports = router;
```
OR (for handling specific routes, not on root itself)
```js
const router = require('express').Router();

module.exports = {
    "path": "", //Example: "/default"
    "router": router
}
```
If you chose to do it the second way, you MUST define a path, or the file won't load and will be <b>skipped</b>.