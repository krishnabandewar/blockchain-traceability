// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Traceability {
    struct Product {
        string name;
        string farmLocation;
        uint256 harvestDate;
        string status;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductAdded(uint256 id, string name, string farmLocation, uint256 harvestDate);

    function addProduct(string memory _name, string memory _farmLocation, uint256 _harvestDate) public {
        productCount++;
        products[productCount] = Product(_name, _farmLocation, _harvestDate, "Harvested");
        emit ProductAdded(productCount, _name, _farmLocation, _harvestDate);
    }

    function updateStatus(uint256 _id, string memory _status) public {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        products[_id].status = _status;
    }
}