var express = require('express');

const { create } = require('ipfs-http-client');
const { body } = require('express-validator');
const { validate } = require('../util/validate');

const ipfsURL = process.env.IPFS_BASE_URL || 'https://ipfs.trackback.dev';
const ipfsPORT = parseInt(process.env.IPFS_PORT || '5001');

const client = create(new URL(ipfsURL+":" + ipfsPORT));

var router = express.Router();


/**
 * Returns the status of an IPFD Daemon
 * @returns status information of connected IPFS node
 */
 router.get('/status', async(req, res) => {
    const identity = await client.id();
    res.json({"identity": identity});
  });


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
    '/add', 
    validate([
        body('senderTimeStamp').isISO8601(),
        body('proof').notEmpty(),
        body('publicKey').notEmpty(),
        body('didDocument').notEmpty(),
    ]),
    
    async(req, res) => {
      res.statusCode = 200;
      try {
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
