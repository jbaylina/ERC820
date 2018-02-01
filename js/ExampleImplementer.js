const ExampleImplementerAbi = require('../build/ExampleImplementer.sol').ExampleImplementerAbi;
const ExampleImplementerByteCode = require('../build/ExampleImplementer.sol').ExampleImplementerByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(ExampleImplementerAbi, ExampleImplementerByteCode);
