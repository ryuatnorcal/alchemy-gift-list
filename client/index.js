const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);
  const name = niceList[Math.floor(Math.random() * niceList.length)]
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  const root = merkleTree.getRoot();
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
    root
  });

  console.log({ gift });
}

main();