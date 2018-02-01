pragma solidity ^0.4.18;

contract ExampleImplementer {
    function canManage(address addr, bytes32 interfaceHash) view public returns(bool) {
        return true;
    }
}
