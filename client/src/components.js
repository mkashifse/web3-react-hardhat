import Web3 from "web3";
import contractAbi from "./hardhat/artifacts/contracts/Greeter.sol/Greeter.json";

let contract,
  web3 = new Web3("");

const web3Init = async (onConnect) => {
  let defaultAccount = "";
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545/")
  );
  const connector = window.ethereum;
  const contract = new web3.eth.Contract(
    contractAbi.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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

const getMethod = (name, params = null) => {
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
      contract.methods[name]().call({ from:  window.web3Obj.defaultAccount }, (err, resp) => {
        if (err) reject(err);
        else resolve(resp);
      });
    }
  });
};

const CButton = (props) => {
  const { text, ...other } = props;
  return (
    <button className="rounded px-3 p-1 h-full bg-indigo-400 w-full text-white text-sm shadow shadow-indigo-300">
      {props.children}
    </button>
  );
};

const CText = (props) => {
  return (
    <input
      {...props}
      className="text-sm p-2 px-4 rounded border w-full"
    ></input>
  );
};

const ContractForm = ({ abi }) => {
  return (
    <div>
      <div className="max-w-lg m-auto divide-y">
        {abi.map((item, i) => {
          if (item.name) {
            return (
              <div className="flex py-2 gap-2" key={i}>
                <div className="w-1/3">
                  <CButton>{item.name}</CButton>
                </div>
                <div className="w-2/3">
                  <CText></CText>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export {
  contractAbi,
  web3Init,
  getMethod,
  CText,
  CButton,
  ContractForm,
};
