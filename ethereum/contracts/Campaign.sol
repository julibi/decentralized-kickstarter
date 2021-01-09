// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    mapping(uint256 => Request) public requests;
    uint256 public pendingRequestsCount;
    uint256 private currentIndex;

    address payable public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = payable(creator);
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public payable restricted {
        Request storage newRequestInStorage = requests[currentIndex];
        newRequestInStorage.description = description;
        newRequestInStorage.value = value;
        newRequestInStorage.recipient = recipient;
        newRequestInStorage.complete = false;
        newRequestInStorage.approvalCount = 0;
        currentIndex++;
        pendingRequestsCount++;
    }

    function approveRequest(uint256 indexOfRequest) public {
        Request storage request = requests[indexOfRequest];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        require(!requests[index].complete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        requests[index].complete = true;
        pendingRequestsCount--;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
           minimumContribution,
           address(this).balance,
           pendingRequestsCount,
           approversCount,
           manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return pendingRequestsCount;
    }
}
