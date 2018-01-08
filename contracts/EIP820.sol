pragma solidity ^0.4.18;

import "./InterfaceImplementationRegistry.sol";

contract EIP820 {
    InterfaceImplementationRegistry interfaceImplementationRegistry = InterfaceImplementationRegistry(0x9de4bbb5e678b748147bf58A20F292f7982e630E);

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
