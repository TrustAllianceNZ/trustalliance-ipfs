var express = require('express');

const { create } = require('ipfs-http-client');
const { body, query } = require('express-validator');
const { mongoose } = require('mongoose');

const { validate } = require('../util/validate');
const axios = require('axios');
const ipfsURL = process.env.IPFS_BASE_URL || 'https://ipfs.trackback.dev';
const ipfsAPIPort = parseInt(process.env.IPFS_API_PORT || '5001');
const ipfsAPIReadonlyPort = parseInt(process.env.ipfsAPIReadonlyPort || '8080');

const client = create(new URL(ipfsURL+":" + ipfsAPIPort));

var router = express.Router();
var didModule = require('../util/didModule');
/**
 * @param CID | String CID of IPFS resource
 * @returns JSON  
 */
router.get(
    '/get', 
    validate([
      query('CID').notEmpty(),
      query('CID').isLength(min=10, max=100),
    ]),


    async(req, res) => {
        let content = {"content": "error"};
        res.statusCode = 400;
        let CID = req.query.CID;
        console.log(req);


        /**/  
        try {
            axios.get(
              ipfsURL+":"+ipfsAPIReadonlyPort+"/ipfs/" + CID,
            ).then(function (response) {
              content = response.data;
              res.statusCode = 200;
              res.json({
                CID: CID,
                content: content
              });
            }).catch(function (error){
              content = error;
            });
        } catch (error) {
          content = error;
          res.json({
            CID: CID,
            content: content
          });
        }
    }
);

/**
 * Returns the status of an IPFD Daemon
 * @returns status information of connected IPFS node
 */
 router.get('/status', async(req, res) => {
    //const identity = await client.id();

    // For local development only 
    res.json({"identity": {
        "id": "12D3KooWJ9nDxkXwaX3M9Sopgu2TSgTzxf9jYieWc7JSasgnmFgC",
        "publicKey": "CAESIHvWuvs+2OSpPGrDAIuRQ1OJf4y+irCRtuKggfae75zp",
        "addresses": [
            "/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWJ9nDxkXwaX3M9Sopgu2TSgTzxf9jYieWc7JSasgnmFgC",
            "/ip4/172.31.23.244/tcp/4001/p2p/12D3KooWJ9nDxkXwaX3M9Sopgu2TSgTzxf9jYieWc7JSasgnmFgC",
            "/ip6/::1/tcp/4001/p2p/12D3KooWJ9nDxkXwaX3M9Sopgu2TSgTzxf9jYieWc7JSasgnmFgC"
        ],
        "agentVersion": "go-ipfs/0.9.1/",
        "protocolVersion": "ipfs/0.1.0",
        "protocols": [
            "/ipfs/bitswap",
            "/ipfs/bitswap/1.0.0",
            "/ipfs/bitswap/1.1.0",
            "/ipfs/bitswap/1.2.0",
            "/ipfs/id/1.0.0",
            "/ipfs/id/push/1.0.0",
            "/ipfs/lan/kad/1.0.0",
            "/ipfs/ping/1.0.0",
            "/libp2p/autonat/1.0.0",
            "/libp2p/circuit/relay/0.1.0",
            "/p2p/id/delta/1.0.0",
            "/x/"
        ]
    }});
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

        /** Use in Prod
          let result = await client.add(JSON.stringify(didDocument));
  
          res.json({
          'cid':result.path,
          'didURI': didURI
          });
         */
        var did = new didModule({
          cid: "Trust Alliance Dev Instance",
          didDocument: JSON.stringify(didDocument), 
          didURI: didURI
        });

        await did.save((err, doc) => {
          if(err) {
            console.log(err)
            return console.error(err);
          } else {
            console.log("Document inserted successfully");
          }
        });

        res.json({
          'cid': did.id,
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
