pragma solidity ^0.4.21;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

contract MarketTOken is ERC20Mintable {
    string public name = "Market Token";
    string public symbol = "MTT";
    uint8 public decimals = 18;
}
