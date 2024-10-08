// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SportNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct RoyaltyInfo {
        address minter;
        address marketer;
        uint256 minterRoyalty;
        uint256 marketerRoyalty;
    }

    mapping(uint256 => RoyaltyInfo) public _royalties;

    constructor(address initialOwner)
    Ownable(initialOwner)
    ERC721("SportNFT", "SNT")
    {}

    function setRoyalities(
        uint256 _minterRoyalty,
        uint256 _marketerRoyalty,
        uint256 tokenId
    ) public onlyOwner {
        require(
            _minterRoyalty + _marketerRoyalty <= 10000,
            "Total royalty exceeds 100%"
        );

        _royalties[tokenId].minterRoyalty = _minterRoyalty;
        _royalties[tokenId].marketerRoyalty = _marketerRoyalty;
    }

    function changeMarketer(address marketer, uint256 tokenId)
    public
    onlyOwner
    {
        require(marketer != address(0), "Invalid marketer address");
        _royalties[tokenId].marketer = marketer;
    }

    function mintNFT(
        address marketer,
        string memory tokenURI,
        uint256 minterRoyalty,
        uint256 marketerRoyalty
    ) public returns (uint256) {
        require(
            minterRoyalty + marketerRoyalty <= 10000,
            "Total royalty exceeds 100%"
        );
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        _royalties[tokenId] = RoyaltyInfo({
            minter: msg.sender,
            marketer: marketer,
            minterRoyalty: minterRoyalty,
            marketerRoyalty: marketerRoyalty
        });

        return tokenId;
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external
    view
    returns (address[] memory, uint256[] memory)
    {
        RoyaltyInfo memory royalty = _royalties[tokenId];
        address[] memory recipients = new address[](2);
        uint256[] memory amounts = new uint256[](2);

        recipients[0] = royalty.minter;
        recipients[1] = royalty.marketer;
        amounts[0] = (salePrice * royalty.minterRoyalty) / 10000;
        amounts[1] = (salePrice * royalty.marketerRoyalty) / 10000;

        return (recipients, amounts);
    }
}