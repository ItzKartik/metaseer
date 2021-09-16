const chefAddress = "0x85B5295Fb01F0aD1C2EA9D9246d5C46EB454848E";
const currentPageToken = "0xfa1e1754bd2896d467930c97d07af799c531cb7d";

var user_address;
var currentPageStaked = 0;

const stakeABI_2 = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Stake", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_unlockblock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "endBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "i", "type": "uint256" }], "name": "getAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAddressesLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRewardBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massupdate", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minimum_deposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "ownerwithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "rewardBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardaddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardperblock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "stakeBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakeaddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalpoolstacked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]

const erc20ABI_2 = [{
    inputs: [{
        internalType: "address",
        name: "account",
        type: "address",
    },],
    name: "balanceOf",
    outputs: [{
        internalType: "uint256",
        name: "",
        type: "uint256",
    },],
    stateMutability: "view",
    type: "function",
},
{
    inputs: [],
    name: "decimals",
    outputs: [{
        internalType: "uint8",
        name: "",
        type: "uint8",
    },],
    stateMutability: "view",
    type: "function",
},
{
    inputs: [{
        internalType: "address",
        name: "owner",
        type: "address",
    },
    {
        internalType: "address",
        name: "spender",
        type: "address",
    },
    ],
    name: "allowance",
    outputs: [{
        internalType: "uint256",
        name: "",
        type: "uint256",
    },],
    stateMutability: "view",
    type: "function",
},
{
    inputs: [{
        internalType: "address",
        name: "spender",
        type: "address",
    },
    {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
    },
    ],
    name: "approve",
    outputs: [{
        internalType: "bool",
        name: "",
        type: "bool",
    },],
    stateMutability: "nonpayable",
    type: "function",
},
{
    inputs: [],
    name: "totalSupply",
    outputs: [{
        internalType: "uint256",
        name: "",
        type: "uint256",
    },],
    stateMutability: "view",
    type: "function",
},
];


function approveSpend() {
    var contract = new web3.eth.Contract(erc20ABI_2, currentPageToken);
    contract.methods
        .approve(user_address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
        .send({ from: user_address }, function (err, transactionHash) {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            alert(
                "Please wait until the approve transaction confirm to stake your pool token. You can refresh the page to update"
            );
        });
}

function addToPool() {
    var contract = new web3.eth.Contract(stakeABI_2, chefAddress);
    var amount = $('#stake_amount').val();
    if (amount == '') {
        alert("Please enter amount");
        $('#stake_amount').focus();
        $('#stake_amount').css('border', '1px solid red');
    } else {
        var amt = BigInt((amount * Math.pow(10, 18)))
        contract.methods.stake(amt)
            .send({ from: user_address }, function (err, transactionHash) {
                alert(
                    "Please wait until the transaction confirm to add your pool. You can refresh the page to update"
                );
            });
    }
}

function removeFromPool() {
    var contract = new web3.eth.Contract(stakeABI_2, chefAddress);
    var amount = prompt("Amount to withdraw", 0);
    contract.methods
        .unstake((amount * Math.pow(10, 18)).toFixed(0))
        .send({ from: user_address }, function (err, transactionHash) {
            console.log(transactionHash);
        });
}


function claimReward() {
    var contract = new web3.eth.Contract(stakeABI_2, chefAddress);
    contract.methods
        .claim()
        .send({ from: user_address }, function(err, transactionHash) {
            //some code
            console.log(transactionHash);
            alert("Transaction Complete: " + transactionHash);
        });
}