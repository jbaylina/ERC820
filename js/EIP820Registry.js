const EIP820RegistryAbi = require('../build/EIP820Registry.sol').EIP820RegistryAbi;
const EIP820RegistryByteCode = require('../build/EIP820Registry.sol').EIP820RegistryByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(EIP820RegistryAbi, EIP820RegistryByteCode);
