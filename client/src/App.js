import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import contractAbi from "./hardhat/artifacts/contracts/Greeter.sol/Greeter.json";

const web3Init = (onConnect) => {
  let defaultAccount = "";
  const web3 = new Web3("http://127.0.0.1:8545/");
  const connector = window.ethereum;
  const contract = new web3.eth.Contract(
    contractAbi.abi,
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  connector
    .request({
      method: "eth_requestAccounts",
    })
    .then(([account]) => {
      defaultAccount = account;
      onConnect({ defaultAccount, contract, web3 });
    });
};

let contract, defaultAccount, web3;

const getMethod = (name, params = null) => {
  return new Promise((resolve, reject) => {
    if (params) {
    } else {
      contract.methods[name]().call(
        { from: defaultAccount },
        (err, resp) => {
          if (err) reject(err);
          else resolve(resp);
        }
      );
    }
  });
};

function App() {
  useEffect(() => {
    web3Init((obj) => {
      contract = obj.contract;
      defaultAccount = obj.defaultAccount;
      web3 = obj.web3;
    });
  }, []);

  const onClick = async () => {
    const resp = await getMethod("greet");
    console.log(resp);
  };

  return (
    <h1 className="text-3xl font-bold underline">
      <button onClick={onClick}>Greet</button>
    </h1>
  );
}

export default App;
