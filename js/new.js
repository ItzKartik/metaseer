var contract, web3, address, abi;

address = "0x85B5295Fb01F0aD1C2EA9D9246d5C46EB454848E";
abi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claim", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Stake", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "_unlockblock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "endBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "i", "type": "uint256" }], "name": "getAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAddressesLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastRewardBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massupdate", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "minimum_deposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "ownerwithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "rewardBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardaddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardperblock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "stakeBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakeaddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalpoolstacked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

function staking_rules(ele) {
    $('.card-table_container__3wkRX').hide();
    $('.rules').fadeIn();
    $('#dashboard').show();
    $('.card-table_active__3JoHq').show();
    $(ele).hide();
}

function do_it() {
    var m_Con = new web3.eth.Contract(abi, chefAddress);

    web3.eth.getAccounts().then(function (accounts) {

        var acc = accounts[0];
        $('.user_address').html(acc);

        m_Con.methods.totalpoolstacked.call().call().then(function (tx) {
            var fin = tx / 10 ** 18
            fin = fin.toFixed(2);
            $('#total_pool_stacked').html(fin);
        }).catch(function (tx) {
            console.log(tx);
        });

        m_Con.methods.rewardBalanceOf(acc).call().then(function (tx) {
            var fin = tx / 10 ** 18
            fin = fin.toFixed(4);
            $('#rewardBalanceOf').html(fin);
        }).catch(function (tx) {
            console.log(tx);
        });

        get_block_data();
        stake_bal();

    });

    web3.eth.getAccounts().then(function (accounts) {
        var acc = accounts[0];
        var pagetoken = new web3.eth.Contract(erc20ABI, currentPageToken);
        pagetoken.methods.allowance(acc, chefAddress).call(function (error, result) {
            if (result > 0) {
                $("#approve_spend").hide();
                $("#stack_btn").show();
            }
        });

        pagetoken.methods.balanceOf(acc).call(function (error, result) {
            pagetoken.methods.decimals().call(function (error, d) {
                currentPageWalletBalance = result;
                result = (result / Math.pow(10, d)).toFixed(4);
                if (isNaN(result)) {
                    result = 0;
                }
                $(".walletbalance").html(result);
            });
        });
    });

    $.ajax({
        url: "https://api.coingecko.com/api/v3/simple/price?ids=metaseer&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false",
        dataType: 'json',
        success: function (data) {
            $('#tokenprice').html(data['metaseer']['usd'])
        }
    });
}

function stake_bal() {
    web3.eth.getAccounts().then(function (accounts) {
        var acc = accounts[0];
        var contract = new web3.eth.Contract(abi, chefAddress)
        contract.methods.stakeBalanceOf(acc).call().then(function (tx) {
            var fin = tx / 10 ** 18
            fin = fin.toFixed(4);
            $('#stakeBalanceOf').html(fin);
        }).catch(function (tx) {
            console.log(tx);
        });
    });
}

function show_countdown(unlock_block, current_block) {
    var calc = unlock_block - current_block;
    $('.unstake_btn').hide();
    $('.unstake_btn2').show();
    if (calc <= 0) {
        final_calc = 'Available'
        $('.unstake_btn').show();
        $('.unstake_btn2').hide();
    } else if (calc <= 1200) {
        n = calc / 20;
        final_calc = 'Unlock in approx. ' + n.toFixed() + " mins";
    } else if (calc <= 28800) {
        console.log(calc)
        n = calc / 1200;
        final_calc = 'Unlock in approx. ' + n.toFixed() + " hours";
    } else if (calc > 28800) {
        n = calc / 28800;
        final_calc = 'Unlock in approx. ' + n.toFixed() + " days";
    } else {
        final_calc = 'Loading...'
    }
    $('#stakedbalance_timer').html(final_calc);
}

function get_block_data() {
    var contract = new web3.eth.Contract(abi, address);
    $.ajax({
        url: "https://api.bscscan.com/api?module=proxy&action=eth_blockNumber&apikey=E936TQZH484W5TTE7EJ1WKU343FQGDG7WN",
        dataType: 'json',
        success: function (data) {
            current_block = parseInt(data['result'], 16);
            web3.eth.getAccounts().then(function (accounts) {
                var acc = accounts[0];
                contract.methods._unlockblock(acc).call().then(function (tx) {
                    unlock_block = parseInt(tx);
                    show_countdown(unlock_block, current_block);
                }).catch(function (e) {
                    console.log(e);
                    return "error";
                });
            });
        },
        error: function (e) {
            console.log(e);
            return 'error';
        }
    });
}

do_it();

setInterval(function () {
    show_countdown();
    get_block_data();
}, 60000);

setInterval(function () {
    do_it();
    stake_bal();
}, 10000);