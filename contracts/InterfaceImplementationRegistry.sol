pragma solidity ^0.4.18;

contract InterfaceImplementationRegistry {

    mapping (address => mapping(bytes32 => address)) interfaces;
    mapping (address => address) public managers;

    modifier canManage(address addr) {
        require(msg.sender == addr || msg.sender == managers[addr]);
        _;
    }

    function interfaceHash(string interfaceName) public pure returns(bytes32) {
        return keccak256(interfaceName);
    }

    function getInterfaceImplementer(address addr, bytes32 iHash) public constant returns (address) {
        return interfaces[addr][iHash];
    }

    function setInterfaceImplementer(address addr, bytes32 iHash, address implementer) public canManage(addr)  {
        interfaces[addr][iHash] = implementer;
        InterfaceImplementerSet(addr, iHash, implementer);
    }

    function changeManager(address addr, address newManager) public canManage(addr) {
        managers[addr] = newManager;
        ManagerChanged(addr, newManager);
    }

    event InterfaceImplementerSet(address indexed addr, bytes32 indexed interfaceHash, address indexed implementer);
    event ManagerChanged(address indexed addr, address indexed newManager);
}
