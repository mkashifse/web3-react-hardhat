import "./App.css";
import { useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";
import contractAbi from "./hardhat/artifacts/contracts/Greeter.sol/Greeter.json";

function App() {
  useEffect(() => {
    const web3 = new Web3("http://127.0.0.1:8545/");
    const provider = window.ethereum;
    // const defaultAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const contract = new web3.eth.Contract(
      contractAbi.abi,
      "0x5fbdb2315678afecb367f032d93f642f64180aa3"
    );
    provider
      .request({
        method: "eth_requestAccounts",
      })
      .then(([account]) => {
        console.log(account);
        contract.methods
          .greet()
          .call({ from: account }, (err, resp) => {
            console.log(resp);
          });
      });
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
