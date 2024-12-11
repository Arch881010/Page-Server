// This is required for EVERY FILE in the routes folder.
const router = require('express').Router();

// All the router things that you would like to do.
// Since these are the tests I used, they could be so much better. Do note, these ALL require SQL to be enabled.
// See why.js if you really want to see a broken down example


router.get("/testy", (req, res) => {
    if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
    req.viewer_pool.query(`SELECT * FROM ${sql.table}`, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});

router.get("/testy2", (req, res) => {
    if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
    const ts = getFormattedDateTime();
    req.writer_pool.query(
        `INSERT INTO ${sql.table} (id, answers, expected_answers, ts) VALUES (NULL, 'Y', 'X', '${ts}')`,
        (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json(results);
        }
    );
});

router.get("/testy3", (req, res) => {
    if(!req.sql) return res.status(500).json({error: "SQL is disabled."});
    req.writer_pool.query(
        `DELETE FROM ${sql.table}`,
        (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json(results);
        }
    );
});

module.exports = router; 