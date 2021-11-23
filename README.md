# TrackBack IPFS Service (MVP)
<p>
  <a href="https://trackback.co.nz/">
    <img src="https://user-images.githubusercontent.com/2051324/127407635-236f8a7a-4ca6-410a-9fc4-add396743cfa.png" alt="TrackBack"></a>
</p>

IPFS connector for  Decentralised Identifiers Storage.
<br>
<a href="https://ipfs.trackback.dev" target="_blank">
    <img src="https://img.shields.io/badge/trackback--ipfs-0.0.1-orange" alt="TrackBack IPFS interface">
</a>
<a href="https://ipfs.trackback.dev" target="_blank">
    <img src="https://img.shields.io/badge/nodejs-14.0-green" alt="Node JS version 14 or above">
</a>
<a href="https://ipfs.trackback.dev" target="_blank">
    <img src="https://img.shields.io/badge/ipfs--http--client-53.0.0-blue" alt="ipfs-http-client">
</a>

## API end points (MVP Release)
* MVP hosted base URL :- `https://ipfs-connector.trackback.dev/`
* IPFS Bootstrap node path with CID path :- `https://ipfs.trackback.dev:8080/ipfs/Qma3fM3VBKPXt7peEeJCAG25s7QMUwvLvGDwFikonZbPff`
* [TrackBack Agent](https://github.com/trackback-blockchain/trackback-verifiable/tree/main/packages/trackback-agent) connects to the service `https://ipfs-connector.trackback.dev/`
### Service Status
Request
```bash
curl --location --request GET '/api/0.1/status'
```
Response
```json
{
    "ping": "pong"
}
```

### IPFS Status

Request
```bash
curl --location --request GET '/api/0.1/ipfs/status'
```

Response
```json
{
    "identity": {
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
    }
}
```

### Add content
Request
```bash
curl --location --request POST 'http://127.0.0.1:3000/api/0.1/ipfs/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "didURI": "did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3",
    "didDocument": {
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed2551s9-2020/v1"
  ],
  "id": "did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3",
  "assertionMethod": [
    {
      "id": "did:trackback.dev:dia-0x12345678999",
      "type": "Ed25519VerificationKey2020", 
      "controller": "did:trackback.dev:dia-0x1234567890",
      "publicKeyMultibase": "AAAAC3NzaCfbdgdsssssss1lZDI1NTE5AAAAIIFraDC1HgOAg22wwwyaRuFvCTcL+N3yeBH/tN+zUI"
    }
  ]
},
"proof": "0x12fag",
"senderTimeStamp": "2021-09-19T00:00:00.046Z",
"publicKey": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILgl183qensmRV8tKBqM/E2GSEuQGLV883tAecMhuNUu gayan@tb-gayan"
}'
```
Response
```json
{
    "cid": "QmcNYMJBhvbrH8oTo5QGNUFA5rhKpBVXHBpfiecxso7D8P",
    "didURI": "did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3"
}
```

### Get content
* Pass the `CID` or `didRef`
Request
```bash
curl --location --request GET 'http://127.0.0.1:3000/api/0.1/ipfs/get?CID=QmcNYMJBhvbrH8oTo5QGNUFA5rhKpBVXHBpfiecxso7D8P' \
--data-raw ''
```

Response
```json
{
    "CID": "QmcNYMJBhvbrH8oTo5QGNUFA5rhKpBVXHBpfiecxso7D8P",
    "content": {
        "@context": [
            "https://www.w3.org/ns/did/v1",
            "https://w3id.org/security/suites/ed2551s9-2020/v1"
        ],
        "id": "did:trackback.dev:0x2a674c8ef2bc79f13faf22d4165ac99efc2cabe6e3194c0a58336fed7c56b1b3",
        "assertionMethod": [
            {
                "id": "did:trackback.dev:dia-0x12345678999",
                "type": "Ed25519VerificationKey2020",
                "controller": "did:trackback.dev:dia-0x1234567890",
                "publicKeyMultibase": "AAAAC3NzaCfbdgdsssssss1lZDI1NTE5AAAAIIFraDC1HgOAg22wwwyaRuFvCTcL+N3yeBH/tN+zUI"
            }
        ]
    }
}
```

# Local setup
## Run Locally
```bash
nvm use 14
yarn && yarn start
```

## Run in debug mode
```bash
nodemon ./bin/www
```