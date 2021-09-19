var express = require('express');
const { create } = require('ipfs-http-client');
const { check, body, header, param } = require('express-validator');
const ab2str = require('arraybuffer-to-string');


const ipfsURL = process.env.IPFS_BASE_URL || 'https://ipfs.trackback.dev';
const ipfsPORT = parseInt(process.env.IPFS_PORT || '5001');

const client = create(new URL(ipfsURL+":" + ipfsPORT))
var router = express.Router();


router.get('/trackback-ipfs/api/0.1/ipfs-status', async(req, res) => {

});

/**
 * Returns the status of an IPFD Daemon
 */
router.get('/trackback-ipfs/api/0.1/status', async(req, res) => {
  const identity = await client.id();
  res.json({"identity": identity});
});

/**
 * Saves a DID Document
 * @didDocument :- A Valid DID Document
 * @didURI:- A Valid DID URI
 * @publicKey :- Public key of the sender
 * @senderTimeStamp :- Time stamp of the sender when the time of dispatching the request
 * @proof :- 
 */
router.post('/trackback-ipfs/api/0.1/add',async(req, res) => {
    let didDocument = req.body.didDocument;
    let didURI = req.body.didURI;
    let publicKey = req.body.publicKey;
    let senderTimeStamp = req.body.senderTimeStamp;
    let proof = req.body.proof;
    let result = await client.add(didDocument);
    
    res.statusCode = 200;
    res.json({
      'cid':result.path,
      'didURI': didURI
    });
});


module.exports = router;
