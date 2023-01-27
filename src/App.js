import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [blockData, setBlockData] = useState({});
  const [blockNumber, setBlockNumber] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    // Check for web3 and update block data
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(() => {
        web3.eth.getBlock(blockNumber).then((block) => {
          setBlockData(block);
        });
      });
    }
  }, [blockNumber]);

  useEffect(() => {
    // Check for web3 and update transaction data
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable().then(() => {
        web3.eth.getTransaction(transactionHash).then((transaction) => {
          setBlockData(transaction);
        });
      });
    }
  }, [transactionHash]);

  return (
    <div>
      <input
        type="number"
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
        placeholder="Enter block number"
      />
      <br />
      <input
        type="text"
        value={transactionHash}
        onChange={(e) => setTransactionHash(e.target.value)}
        placeholder="Enter transaction hash"
      />
      <br />
      <pre>{JSON.stringify(blockData, null, 2)}</pre>
    </div>
  );
}

export default App;