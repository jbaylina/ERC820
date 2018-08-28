const EthereumTx = require('ethereumjs-tx');
const EthereumUtils = require('ethereumjs-util');
const rawTransaction = require('../js/rawTransaction');

const offeset = parseInt(process.argv[2]);

for (let i = 0; i < 16; i++) {
  const code = '0x' + require(`../tmp/${i}/artifacts/ERC820Registry.json`).compilerOutput.evm.bytecode.object;
  const tx = new EthereumTx({...rawTransaction, data: code});
  const contractAddr = EthereumUtils.toChecksumAddress(
    '0x' + EthereumUtils.generateAddress('0x' + tx.getSenderAddress().toString('hex'), 0 ).toString('hex')
  );
  console.log(`${offeset + i} -> ${contractAddr}`);
}
