pragma solidity ^0.4.18;

import "./EIP820Registry.sol";


contract EIP820Implementer {
    EIP820Registry eip820Registry = EIP820Registry(0x9aA513f1294c8f1B254bA1188991B4cc2EFE1D3B);

    function setInterfaceImplementation(string ifaceLabel, address impl) internal {
        bytes32 ifaceHash = keccak256(ifaceLabel);
        eip820Registry.setInterfaceImplementer(this, ifaceHash, impl);
    }

    function interfaceAddr(address addr, string ifaceLabel) internal constant returns(address) {
        bytes32 ifaceHash = keccak256(ifaceLabel);
        return eip820Registry.getInterfaceImplementer(addr, ifaceHash);
    }

    function delegateManagement(address newManager) internal {
        eip820Registry.setManager(this, newManager);
    }

}
