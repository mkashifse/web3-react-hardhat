import "./App.css";
import { useEffect } from "react";
import contractAbi  from "./../../hardhat/artifacts/contracts/Greeter.sol/Greeter.json";

function App() {
  useEffect(() => {
    // const web3 = new Web3("http://127.0.0.1:8545/");
    // const contract = web3.eth.Contract(contractAbi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    // console.log(contract);
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
