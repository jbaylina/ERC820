pragma solidity ^0.4.18;

import "./ERC820Implementer.sol";

contract ExampleImplementer2 is ERC820Implementer {

    function ExampleImplementer2() public {
        setInterfaceImplementation("ERC820ExampleImplementer2", this);
//        delegateManagement(msg.sender);
    }

}
