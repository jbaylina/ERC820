
const EIP820 = require('../index.js');

const res = EIP820.generateDeployTx();

console.log("Sender: ", res.sender);
console.log("RawTx: ", res.rawTx);
console.log("Contract:", res.contractAddr);

setTimeout(() => {}, 200 );
