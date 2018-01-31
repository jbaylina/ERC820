pragma solidity ^0.4.18;

import "./InterfaceImplementationRegistry.sol";

contract EIP820 {
    InterfaceImplementationRegistry interfaceImplementationRegistry = InterfaceImplementationRegistry(0xa80366843213DFBE44307c7c4Ce4BcfC7A6437E5);

    function setInterfaceImplementation(string ifaceLabel, address impl) internal {
        interfaceImplementationRegistry.setInterfaceImplementer(this, keccak256(ifaceLabel), impl);
    }

    function interfaceAddr(address addr, string ifaceLabel) internal constant returns(address) {
        return interfaceImplementationRegistry.getInterfaceImplementer(addr, keccak256(ifaceLabel));
    }

    function delegateManagement(address newManager) internal {
        interfaceImplementationRegistry.setManager(this, newManager);
    }
}
