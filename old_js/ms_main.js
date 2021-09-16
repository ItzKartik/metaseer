

function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            printValues(obj[k]);
        } else {
            document.write(obj[k] + "<br>");
        };
    }
};


var web3 = new Web3(
    new Web3.providers.HttpProvider(
        'https://bsc-dataseed1.binance.org:443'
    )
);

const BN = web3.utils.BN;
const chefAddress2 = "0x85B5295Fb01F0aD1C2EA9D9246d5C46EB454848E";
const tokenAddress = "0xfa1e1754bd2896d467930c97d07af799c531cb7d";
const uni1 = "0xfa1e1754bd2896d467930c97d07af799c531cb7d";

var ethconnected = false;
var ethaddress = "0x";
var balance = 0;
var currentPageToken2 = "0x";
var currentPagePoolID = 0;
var currentPageWalletBalance = 0;
var currentPageStaked = 0;
var currentPageReward = 0;

var prices = {
    takeusd: -1,
    takeeth: -1,
    ethusd: -1,
    linketh: -1,
    usdceth: -1,
    susdeth: -1,
    yfieth: -1,
};
//contract,name,url,weight,yield
var pools = [
    ["0xfa1e1754bd2896d467930c97d07af799c531cb7d", "MetaSeer Pool", "https://pancakeswap.info/token/0xFA1e1754BD2896D467930C97d07aF799C531Cb7D", 1, 0, 0, "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xfa1e1754bd2896d467930c97d07af799c531cb7d"]
];
var loadedpools = 0;
var totalPoolWeight = 1; // sum of weight
const uniswapABI = [{
        constant: true,
        inputs: [],
        name: "getReserves",
        outputs: [
            { internalType: "uint112", name: "_reserve0", type: "uint112" },
            { internalType: "uint112", name: "_reserve1", type: "uint112" },
            { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];
const erc20ABI = [{
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address",
        }, ],
        name: "balanceOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
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
        }, ],
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
        }, ],
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
        }, ],
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
        }, ],
        stateMutability: "view",
        type: "function",
    },
];

const stakeABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_unlockblock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"getAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddressesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massupdate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minimum_deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ownerwithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"rewardBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardperblock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"stakeBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakeaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalpoolstacked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const chefABI = [{
        inputs: [{
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "pendingTakeout",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "takeoutPerBlock",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256",
        }, ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "userInfo",
        outputs: [{
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "rewardDebt",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];



async function connectWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        conn = await window.ethereum.enable();
        console.log(conn.length);

        ethconnected = conn.length > 0;
        if (ethconnected) {
            ethaddress = conn[0];
        }
        updateConnectStatus();
        web3.eth.getAccounts().then(function(tx){
            alert(tx[0]);
        });

        return true;
    }
}

function updateConnectStatus() {
    if (ethconnected) {
        $("body").addClass("web3");
    }
    // getBalance(ethaddress);
    // getstaked(ethaddress);
}


// no use
function getSupply() {
    var contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    contract.methods.totalSupply().call(function(error, result) {
        result = result / Math.pow(10, 18);
        console.log(error, result);
        $(".mcap span").animateNumbers("$" + parseInt(result * prices["takeusd"]));
    });
}


// Working
function getBalance(address) {
    var contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    contract.methods.balanceOf(address).call(function(error, result) {
        contract.methods.decimals().call(function(error, d) {
            result = result / Math.pow(10, d);
            if (isNaN(result)) {
                result = 0;
            }

            $(".balance").text(result.toFixedSpecial(4) + " METAS");
            balance = result;
        });
    });
}

function getstaked(address){
    var contract = new web3.eth.contract(stakeABI, chefAddress);
    contract.methods
        .userInfo(address)
        .call(function(error,result) {
        result[0] = (result[0] / Math.pow(10, 18)).toFixedSpecial(4);
        if (isNAN(result)) {
            result = 0;
        }
        (".stakedbalance").text(result[0]);
        });
}

function hidepages() {
    $("main").hide();
}


function nav(classname) {
    hidepages();
    $("body").removeClass("approved");
    $("main." + classname).show();
    if (classname.indexOf("pool") === 0) {
        initpooldata(parseInt(classname.slice(-1)));
        $("main.pool").show();
        getdata();
    }
}



function initpooldata(id) {
    $(".farmname").text(pools[id][1] );
    currentPageToken = pools[id][0];
    currentPagePoolID = id;
    //get yield balance

    //get staked balance
    //if larger than zero, approved

    var contract = new web3.eth.Contract(chefABI, chefAddress);
    contract.methods
        .userInfo(currentPagePoolID, ethaddress)
        .call(function(error, result) {
            currentPageStaked = result[0];
            result[0] = (result[0] / Math.pow(10, 18)).toFixedSpecial(7);
            console.log(error, result);
            $(".stakedbalance").text(result[0]);
        });

    var pagetoken = new web3.eth.Contract(erc20ABI, currentPageToken);
    pagetoken.methods
        .allowance(ethaddress, chefAddress)
        .call(function(error, result) {
            if (result > 0) {
                $("body").addClass("approved");
            }
        });

    contract.methods
        .pendingTakeout(currentPagePoolID, ethaddress)
        .call(function(error, result) {
            currentPageReward = result;
            result = (result / Math.pow(10, 18)).toFixedSpecial(3);
            if (isNaN(result)) {
                result = 0;
            }
            // $(".rewardbalance").animateNumbers(result);
        });

    //get wallet balance

    var contract = new web3.eth.Contract(erc20ABI, currentPageToken);
    contract.methods.balanceOf(ethaddress).call(function(error, result) {
        contract.methods.decimals().call(function(error, d) {
            currentPageWalletBalance = result;
            result = (result / Math.pow(10, d)).toFixedSpecial(7);
            if (isNaN(result)) {
                result = 0;
            }
            console.log(error, result);
            $(".walletbalance").text(result);
        });
    });
}

function approveSpend() {
    var contract = new web3.eth.Contract(erc20ABI, currentPageToken);
    contract.methods
        .approve(
            chefAddress,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        )
        .send({ from: ethaddress }, function(err, transactionHash) {
            if (err) {
                alert("Error: " + err);
                return;
            }
            alert(
                "Please wait until the approve transaction confirm to stake your pool token. You can refresh the page to update"
            );
            $("body").addClass("approved");
            console.log(transactionHash);
        });
}

function addToPool() {
    var contract = new web3.eth.Contract(stakeABI, chefAddress);
    var amount = prompt(
        "Staking will lock your META for 30 days"+"\n"+"Amount to stake (min. 2500 META)",
        (currentPageWalletBalance) / Math.pow(10, 18)
    );
    
    contract.methods
        .stake(
            (amount * Math.pow(10, 18)).toFixedSpecial(0)
        )
        .send({ from: ethaddress }, function(err, transactionHash) {
            console.log("Error: ", err);
            console.log(transactionHash);
        });
}

function claimReward() {
    var contract = new web3.eth.Contract(stakeABI, chefAddress);
    contract.methods
        .claim()
        .send({ from: ethaddress }, function(err, transactionHash) {
            //some code
            console.log(transactionHash);
            alert("Transaction Complete: " + transactionHash);
        });
}

function removeFromPool() {
    var contract = new web3.eth.Contract(stakeABI, chefAddress);
    var amount = prompt("Amount to withdraw", currentPageStaked / 10 ** 18);
    contract.methods
        .unstake((amount * Math.pow(10, 18)).toFixedSpecial(0))
        .send({ from: ethaddress }, function(err, transactionHash) {
            //some code
            console.log(transactionHash);
        });
}

function getUniswapPrice() {
    var ctx0 = new web3.eth.Contract(uniswapABI, pools[0][0]); // TAKE-eth
    var ctx1 = new web3.eth.Contract(uniswapABI, uni1); // usdc-eth
    try {
        ctx0.methods.getReserves().call(function(err, result1) {
            console.log(err, result1);
            ctx1.methods.getReserves().call(function(err, result2) {
                var takeeth = result1["_reserve1"] / result1["_reserve0"];
                prices["takeeth"] = takeeth;
                var ethusd =
                    (result2["_reserve0"] / result2["_reserve1"]) * Math.pow(10, 18 - 6); // cause USDC uses 6 decimal
                prices["ethusd"] = ethusd;

                var takeusd = takeeth * ethusd;
                prices["takeusd"] = takeusd;

                getSupply();
                updatePrice(prices["metasusd"]);
            });
        });
    } catch (e) {
        console.error(e);
    }
}

function loadedPool() {
    loadedpools++;
    if (loadedpools > 5) {
        var tvl = 0;
        for (var i = 0; i < pools.length; i++) {
            console.log(i, pools[i][5], pools[i][5] * prices["takeusd"]);
            tvl = tvl + (0.25*(pools[i][5] * prices["takeusd"]));
        }

        var realtvl = 0;
        for (var i = 0; i < pools.length; i++) {
            if (i != 2 && i != 3) {
                console.log(i, pools[i][5], pools[i][5] * prices["takeusd"]);
                realtvl = realtvl + pools[i][5] * prices["takeusd"];
            }
        }

        $(".tvl span").animateNumbers(parseInt(tvl));
        console.warn("tvl:" + tvl);
    }
}

function tradeLink(id) {
    if (typeof id === 'undefined') {
        window.open(pools[currentPagePoolID][2])
    } else {
        window.open(pools[id][2])
    }
}


function updatePrice(p) {
    $(".tokenprice").text("$" + p.toFixed(4));
    updateYield();
}

function getlptoken(id) {
    if (typeof id === "undefined") {
        window.open(pools[currentPagePoolID][2]);
    } else {
        window.open(pools[id][2]);
    }
}

function init() {
    connectWeb3();
}

init();
Number.prototype.toFixedSpecial = function(n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;

    // if number is in scientific notation, pick (b)ase and (p)ower
    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function(p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += "." + Array(n + 1).join(0);

    return str;
};