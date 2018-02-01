pragma solidity ^0.4.18;

contract ExampleImplementer {
    function canManage(address addr, bytes32 interfaceHash) public returns(bool) {
        return true;
    }
}
