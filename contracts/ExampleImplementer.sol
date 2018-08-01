pragma solidity ^0.4.24;

import "./ERC820ImplementerInterface.sol";


contract ExampleImplementer is ERC820ImplementerInterface {
    function canImplementInterfaceForAddress(address addr, bytes32 interfaceHash) public view returns(bytes32) {
        return ERC820_ACCEPT_MAGIC;
    }
}
