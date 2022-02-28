var express = require('express');

var router = express.Router();

/**
 * Returns the status of trustalliance-IPFS service
 * @returns `HTTP status 200` | JSON {ping: 'pong'}
 */
router.get('/status', async(req, res) => {
  res.json({ping: "pong"})
});


module.exports = router;
