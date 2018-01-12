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


    /// @notice query if an address implements an interface and thru which contract
    /// @param addr Address that wants to be queried for the implementation of an interface
    /// @param iHash SHA3 of the string of the name of the interface.
    ///  Example `web3.utils.sha3('Ierc777`')`
    /// @return The address of the contract that implements a spefici interface
    ///  or 0x0 if `addr` does not implement this interface
    function getInterfaceImplementer(address addr, bytes32 iHash) public constant returns (address) {
        return interfaces[addr][iHash];
    }

    /// @notice Sets the contract that will handle a specific interface.
    ///  only the address or a `manager` defined for that addresss can set it.
    /// @param addr Address that you want to define the interface for.
    /// @param iHash SHA3 of the string of the name of the interface.
    ///  Example `web3.utils.sha3('Ierc777`')`
    function setInterfaceImplementer(address addr, bytes32 iHash, address implementer) public canManage(addr)  {
        interfaces[addr][iHash] = implementer;
        InterfaceImplementerSet(addr, iHash, implementer);
    }

    /// @notice Sets an external `manager` that will be able to call `setInterfaceImplementer()`
    ///  in behalf of the address.
    /// @param addr Address that you want to define the manager for.
    /// @param newManager The address of the manager for the `addr` that will replace
    ///  the old one.  Set to 0x0 if you want to remove the manager.
    function changeManager(address addr, address newManager) public canManage(addr) {
        managers[addr] = newManager;
        ManagerChanged(addr, newManager);
    }

    event InterfaceImplementerSet(address indexed addr, bytes32 indexed interfaceHash, address indexed implementer);
    event ManagerChanged(address indexed addr, address indexed newManager);
}
