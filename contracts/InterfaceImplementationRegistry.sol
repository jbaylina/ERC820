pragma solidity ^0.4.18;

contract InterfaceImplementationRegistry {

    mapping (address => mapping(bytes32 => address)) interfaces;

    function getInterfaceImplementer(address addr, bytes32 interfaceHash) public constant returns (address implementer) {
        return interfaces[addr][interfaceHash];
    }

    function setInterfaceImplementer(bytes32 interfaceHash, address implementer) public {
        interfaces[msg.sender][interfaceHash] = implementer;
        InterfaceImplementerSet(msg.sender, interfaceHash, implementer);
    }

    event InterfaceImplementerSet(address indexed addr, bytes32 indexed interfaceHash, address indexed implementer);
}
