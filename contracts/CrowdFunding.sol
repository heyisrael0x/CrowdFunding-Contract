// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error CrowdFunding__DeadlineShouldBeInTheFuture();
error CrowdFunding__DonationNotSuccessFully();
error CrowdFunding__PleaseSendEnough();

contract CrowdFunding is ReentrancyGuard {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public campaignId = 0;

    event CampaignCreated(
        address indexed _owner,
        string _title,
        string _description,
        uint256 _target,
        uint256 _deadline,
        string _image
    );

    function createCampaign(
        // address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public nonReentrant {
        Campaign storage campaign = campaigns[campaignId];

        if (_deadline < block.timestamp) {
            revert CrowdFunding__DeadlineShouldBeInTheFuture();
        }
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        campaignId++;

        emit CampaignCreated(
            msg.sender,
            _title,
            _description,
            _target,
            _deadline,
            _image
        );
    }

    function donateToCampaign(uint256 _id) public payable {
        if (msg.value <= 0) {
            revert CrowdFunding__PleaseSendEnough();
        }
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        if (sent) {
            campaign.donators.push(msg.sender);
            campaign.donations.push(amount);
            campaign.amountCollected = campaign.amountCollected + amount;
        } else {
            revert CrowdFunding__DonationNotSuccessFully();
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignId);

        for (uint i = 0; i < campaignId; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
