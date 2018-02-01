pragma solidity ^0.4.18;

import "./EIP820Registry.sol";


contract EIP820Implementer is EIP820ImplementerInterface {
    mapping (bytes32 => bool) implementedInterfaces;
    EIP820Registry eip820Registry = EIP820Registry(0x33592f752b4275b9e8289839bf650a4c5d23f960);

    function setInterfaceImplementation(string ifaceLabel, address impl) internal {
        bytes32 ifaceHash = keccak256(ifaceLabel);
        implementedInterfaces[ifaceHash] = impl != 0;
        eip820Registry.setInterfaceImplementer(this, ifaceHash, impl);
    }

    function interfaceAddr(address addr, string ifaceLabel) internal constant returns(address) {
        return eip820Registry.getInterfaceImplementer(addr, keccak256(ifaceLabel));
    }

    function delegateManagement(address newManager) internal {
        eip820Registry.setManager(this, newManager);
    }

    function canManage(address addr, bytes32 interfaceHash) public returns(bool) {
        if (addr != address(this)) return false;
        return implementedInterfaces[interfaceHash];
    }
}
