require('@nomicfoundation/hardhat-ethers');

module.exports = {
  solidity: "0.8.28", // Use the exact version required by Lock.sol
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};