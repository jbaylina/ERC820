const InterfaceImplementationRegistryAbi = require('../build/InterfaceImplementationRegistry.sol').InterfaceImplementationRegistryAbi;
const InterfaceImplementationRegistryCode = require('../build/InterfaceImplementationRegistry.sol').InterfaceImplementationRegistryCode;
const generateClass = require('eth-contract-class').default;

module.exports = generateClass(InterfaceImplementationRegistryAbi, InterfaceImplementationRegistryCode);
