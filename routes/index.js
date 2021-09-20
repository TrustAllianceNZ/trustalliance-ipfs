var express = require('express');
const { create } = require('ipfs-http-client');
const { body ,validationResult } = require('express-validator');


const ipfsURL = process.env.IPFS_BASE_URL || 'https://ipfs.trackback.dev';
const ipfsPORT = parseInt(process.env.IPFS_PORT || '5001');

const client = create(new URL(ipfsURL+":" + ipfsPORT))
var router = express.Router();


/**
 * Returns the status of TrackBack-IPFS service
 * @returns `HTTP status 200` | JSON {ping: 'pong'}
 */
router.get('/trackback-ipfs/api/0.1/ipfs-status', async(req, res) => {
  res.json({ping: "pong"})
});

/**
 * Returns the status of an IPFD Daemon
 * @returns status information of connected IPFS node
 */
router.get('/trackback-ipfs/api/0.1/status', async(req, res) => {
  const identity = await client.id();
  res.json({"identity": identity});
});


/**
 * 
 * @param {*} validations | Parameters in POST request 
 * @returns next if there's no errors or else HTTP 400 with an error message in JSON
 */
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);

    if(errors.isEmpty()){
      return next();
    }

    res.status(400).json({errors: errors.array()});

  };
};


/**
 * Saves a DID Document
 * @didDocument :- A Valid DID Document
 * @publicKey :- Public key of the sender
 * @senderTimeStamp :- Time stamp of the sender when the time of dispatching the request
 * @proof :- Cryprographical proof od data
 * @didURI :- URI / ID of the DID document
 * @returns 
 *    HTTP status code 200
 *    {
        'cid':result.path,
        'didURI': didURI
      }

      or 
      
      HTTP status code 400

      {
        "message": "Error adding DID Document",
        "error": err
      }

 */
router.post(
  '/trackback-ipfs/api/0.1/add', validate([
      body('senderTimeStamp').isISO8601(),
      body('proof').notEmpty(),
      body('publicKey').notEmpty(),
      body('didDocument').notEmpty(),
  ]),
  
  async(req, res) => {
    res.statusCode = 200;
    try {
      // await validationResult(req).throw();
      let didDocument = req.body.didDocument;
      let didURI = req.body.didURI;
      let publicKey = req.body.publicKey;
      let senderTimeStamp = req.body.senderTimeStamp;
      let proof = req.body.proof;

      let result = await client.add(JSON.stringify(didDocument));

      res.json({
        'cid':result.path,
        'didURI': didURI
      });
    } catch (err) {
      res.statusCode = 400;
      res.json({
        "message": "Error adding DID Document",
        "error": err
      });
    }
});


module.exports = router;
