const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const express = require("express");
const app = express();

app.get("/block/:blockNumber", async (req, res) => {
    const blockNumber = req.params.blockNumber;
    const block = await web3.eth.getBlock(blockNumber);
    res.send(block);
});

app.get("/transaction/:transactionHash", async (req, res) => {
    const transactionHash = req.params.transactionHash;
    const transaction = await web3.eth.getTransaction(transactionHash);
    res.send(transaction);
});
