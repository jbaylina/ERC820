const ExampleImplementer2Abi = require('../build/ExampleImplementer2.sol').ExampleImplementer2Abi;
const ExampleImplementer2ByteCode = require('../build/ExampleImplementer2.sol').ExampleImplementer2ByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(ExampleImplementer2Abi, ExampleImplementer2ByteCode);
