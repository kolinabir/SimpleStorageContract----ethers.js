// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract SimpleStorage {
    uint256 favNumber;
    uint256[] listOfFavNum;
    struct Person {
        uint256 favNum1;
        string name;
    }
    Person[] public listOfPeople;
    // Person public Kol = Person(7,"KOl");
    mapping(string => uint256) public nameToFavNum;

    function addPerson(string memory name, uint256 _favNum) public {
        listOfPeople.push(Person(_favNum, name));
        nameToFavNum[name] = _favNum;
    }

    function store(uint256 _favnum) public virtual {
        favNumber = _favnum;
    }

    function retrive() public view returns (uint256) {
        return favNumber;
    }
}
