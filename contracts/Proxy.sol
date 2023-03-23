// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./StorageSlot.sol";

contract Proxy {
    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot.getAddressSlot(keccak256("impl")).value.delegatecall(msg.data);
        require(success);
    }
}
contract Logic1{
    uint public x=0;

    function changeX(uint _x) external{
        x=_x;
    }
}
contract Logic2{
    uint public x;

    function changeX(uint _x) external{
        x=_x;
    }
    function tripleX() external{
        x*=3;
    }
}
