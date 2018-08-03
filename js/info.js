
const ERC820 = require('../index.js');

const res = ERC820.generateDeployTx();

console.log("Sender: ", res.sender);
console.log("RawTx: ", res.rawTx);
console.log("Contract:", res.contractAddr);

setTimeout(() => {}, 200 );
