// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Proxy{
    
    address implementation;

    function changeX(uint _x) external{
      Logic1(implementation).changeX(_x);
    }

    function changeImplementation(address add)external{
        implementation=add;

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
}
