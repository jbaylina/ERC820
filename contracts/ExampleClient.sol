pragma solidity ^0.4.24;

import "./ERC820Client.sol";


contract ExampleClient is ERC820Client {

    address private owner;

    constructor() public {
        setInterfaceImplementation("ExampleClient", this);
        owner = msg.sender;
    }

    function delegateManager() public {
        require(owner == msg.sender, "Not the owner");
        delegateManagement(msg.sender);
    }

}
