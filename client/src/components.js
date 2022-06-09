import Web3 from "web3";
import contractAbi from "./hardhat/artifacts/contracts/Greeter.sol/Greeter.json";

let contract;

const web3Init = async (onConnect) => {
  let defaultAccount = "";
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545/")
  );
  const connector = window.ethereum;
  const contract = new web3.eth.Contract(
    contractAbi.abi,
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  console.log(contractAbi.abi);

  const accounts = await web3.eth.getAccounts();
  connector
    .request({
      method: "eth_requestAccounts",
    })
    .then(([account]) => {
      defaultAccount = account;
      window.web3Obj = { defaultAccount, contract, web3, accounts };
      onConnect(window.web3Obj);
    });
};

const getMethod = (contract, name, params = null) => {
  return new Promise((resolve, reject) => {
    if (params) {
      contract.methods[name](params).send(
        { from: window.web3Obj.defaultAccount },
        (err, resp) => {
          if (err) reject(err);
          else resolve(resp);
        }
      );
    } else {
      contract.methods[name]().call(
        { from: window.web3Obj.defaultAccount },
        (err, resp) => {
          if (err) reject(err);
          else resolve(resp);
        }
      );
    }
  });
};

export { contractAbi, web3Init, getMethod };
