const EthereumTx = require('ethereumjs-tx');
const EthereumUtils = require('ethereumjs-util');

const ERC820Registry = require('../artifacts/contracts').ERC820Registry;
const rawTransaction = require('./rawTransaction');

generateDeployTx = () => {
    const tx = new EthereumTx(rawTransaction);
    const res = {
        sender: EthereumUtils.toChecksumAddress('0x' + tx.getSenderAddress().toString('hex')),
        rawTx: '0x' + tx.serialize().toString('hex'),
        contractAddr: EthereumUtils.toChecksumAddress(
          '0x' + EthereumUtils.generateAddress('0x' + tx.getSenderAddress().toString('hex'), 0 ).toString('hex')),
    }
    return res;
};


deploy = async (web3, account) => {
    const res = generateDeployTx();

    const deployedCode = await web3.eth.getCode(res.contractAddr);

    if (deployedCode.length <=3 ) {
        await web3.eth.sendTransaction({
          from: account, to: res.sender, value: '100000000000000000'/* web3.utils.toWei(0.1) */
        });
        await web3.eth.sendSignedTransaction(res.rawTx);
    }
    return new ERC820Registry(web3, res.contractAddr);
};



module.exports.generateDeployTx = generateDeployTx;
module.exports.deploy = deploy;
