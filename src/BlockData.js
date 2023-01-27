import React, { Component } from 'react';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

class BlockData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockNumber: '',
            transactionHash: '',
            block: null,
            transaction: null,
        };
    }

    handleBlockNumberChange = (event) => {
        this.setState({ blockNumber: event.target.value });
    }

    handleTransactionHashChange = (event) => {
        this.setState({ transactionHash: event.target.value });
    }

    fetchBlockData = () => {
        web3.eth.getBlock(this.state.blockNumber, (error, block) => {
            if(!error) {
                this.setState({ block });
            }
        });

        web3.eth.getTransaction(this.state.transactionHash, (error, transaction) => {
            if(!error) {
                this.setState({ transaction });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Block and Transaction Data</h1>
                <div>
                    <label>
                        Block Number:
                        <input type="text" value={this.state.blockNumber} onChange={this.handleBlockNumberChange} />
                    </label>
                    <button onClick={this.fetchBlockData}>Fetch Block Data</button>
                </div>
                <div>
                    <label>
                        Transaction Hash:
                        <input type="text" value={this.state.transactionHash} onChange={this.handleTransactionHashChange} />
                    </label>
                    <button onClick={this.fetchBlockData}>Fetch Transaction Data</button>
                </div>
                {this.state.block ? <p>Block Number: {this.state.block.number}</p> : null}
                {this.state.transaction ? <p>Transaction Hash: {this.state.transaction.hash}</p> : null}
            </div>
        );
    }
}

export default BlockData;
