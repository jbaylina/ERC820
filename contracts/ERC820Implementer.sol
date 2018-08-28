pragma solidity ^0.4.24;

contract ERC820Registry {
    function getManager(address _addr) public view returns(address);
    function setManager(address _addr, address _newManager) external;
    function getInterfaceImplementer(address _addr, bytes32 _interfaceHash) external view returns (address);
    function setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer) external;
}

contract ERC820Implementer {
    ERC820Registry erc820Registry = ERC820Registry(0x820d0Bc4d0AD9E0E7dc19BD8cF9C566FC86054ce);

    function setInterfaceImplementation(string _interfaceLabel, address impl) internal {
        bytes32 interfaceHash = keccak256(abi.encodePacked(_interfaceLabel));
        erc820Registry.setInterfaceImplementer(this, interfaceHash, impl);
    }

    function interfaceAddr(address addr, string _interfaceLabel) internal constant returns(address) {
        bytes32 interfaceHash = keccak256(abi.encodePacked(_interfaceLabel));
        return erc820Registry.getInterfaceImplementer(addr, interfaceHash);
    }

    function delegateManagement(address _newManager) internal {
        erc820Registry.setManager(this, _newManager);
    }
}
