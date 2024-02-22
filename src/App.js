import React, { useState } from 'react';
import axios from 'axios';
import BitcoinDistributionChart from './BitcoinDistributionChart';


const BlockchainStats = () => {
  // Here you would fetch the actual data from a backend or API
  // For demonstration purposes, we will use hardcoded data
  const [stats, setStats] = useState({
    // blocks: 831169,
    // transactions: 967306183,
    // addresses: 1206456923,
    unspentOutputs: 216828930,
    blockchainSize: 512.91,
    bitcoinCirculatingSupply: 19632283.54497096,
    distribution: {
      '1000000-100000': 4,
      '100000-10000': 107,
      // ... other categories
    },
    zeroBalanceAddresses: 1156986461,
  });
  const [blocks, setBlocks] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [addresses, setAddress] = useState(0);
  let data = JSON.stringify({
    "query": "query MyQuery {\n  bitcoin(network: bitcoin) {\n    transactions(inputCount: {gt: 0}) {\n      count\n    }\n    blocks {\n      count\n    }\n    inputs {\n      count(uniq: addresses)\n    }\n  }\n}\n",
    "variables": "{}"
 });


  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graphql.bitquery.io',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'BQYJiKjTyOSZTJZgYOhXFHggkNP5FQDc',
      'Authorization': 'Bearer ory_at_atL_ckHbpjH3kS440_psx4lOJOj0fOkwVxIvuPVAsig.9lbSKfbESdwJwbGR21A9oNm229NRzTvCHW1LqNrNbMA'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setTransactions(response.data.data.bitcoin.transactions[0].count)
      setBlocks(response.data.data.bitcoin.blocks[0].count)
      setAddress(response.data.data.bitcoin.inputs[0].count)
    })
    .catch((error) => {
      console.log(error);
    });

    
  return (
    <div className="blockchain-stats">
      <h1>Blockchain State</h1>
      <div className="stats">
        <div className="stat">
          <h2>Blocks</h2>
          <p>{blocks}</p>
        </div>
        <div className="stat">
          <h2>Transactions</h2>
          <p>{transactions}</p>
        </div>
        <div className="stat">
          <h2>Addresses</h2>
          <p>{addresses}</p>
        </div>
        <div className="stat">
          <h2>Unspent outputs</h2>
          <p>{stats.unspentOutputs}</p>
        </div>
        <div className="stat">
          <h2>Blockchain size</h2>
          <p>{stats.blockchainSize}</p>
        </div>
        <div className="stat">
          <h2>Bitcoin circulating supply</h2>
          <p>{stats.bitcoinCirculatingSupply}</p>
        </div>
        {/* Repeat for other statistics */}
      </div>
      <h2>Bitcoin distribution by addresses</h2>
      <div className="distribution">
        <BitcoinDistributionChart></BitcoinDistributionChart>
        {/* {Object.entries(stats.distribution).map(([range, count]) => (
          <div key={range} className="distribution-item">
            <span>{range}</span>
            <span>{count}</span>
          </div>
        ))} */}
      </div>
      <div className="zero-balance">
        <h2>Zero balance addresses:</h2>
        <p>{stats.zeroBalanceAddresses} (95%)</p>
      </div>
      {/* Add link to Blockchain statistics */}
      <a href="/blockchain-statistics">Blockchain statistics &gt;</a>
    </div>
  );
};

export default BlockchainStats;
