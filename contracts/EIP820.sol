pragma solidity ^0.4.18;

import "./InterfaceImplementationRegistry.sol";

contract EIP820 {
    InterfaceImplementationRegistry interfaceImplementationRegistry = InterfaceImplementationRegistry(0x8A5cc001E6550504965816241375e44F2f8b44F0);

    function setInterfaceImplementation(string ifaceLabel, address impl) internal {
        interfaceImplementationRegistry.setInterfaceImplementer(this, keccak256(ifaceLabel), impl);
    }

    function interfaceAddr(address addr, string ifaceLabel) internal constant returns(address) {
        return interfaceImplementationRegistry.getInterfaceImplementer(addr, keccak256(ifaceLabel));
    }

    function delegateManagement(address newManager) internal {
        interfaceImplementationRegistry.changeManager(this, newManager);
    }
}
