const InterfaceImplementationRegistryAbi = require('../build/InterfaceImplementationRegistry.sol').InterfaceImplementationRegistryAbi;
const InterfaceImplementationRegistryByteCode = require('../build/InterfaceImplementationRegistry.sol').InterfaceImplementationRegistryByteCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(InterfaceImplementationRegistryAbi, InterfaceImplementationRegistryByteCode);
