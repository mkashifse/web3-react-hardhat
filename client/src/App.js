import "./App.css";
import { useEffect, useState } from "react";
import avatar from "animal-avatar-generator";
import { FaEthereum } from "react-icons/fa";
import { web3Init, getMethod, contractAbi } from "./components";
import { ContractForm } from "./ContractForm";

function App() {
  const [avt, setAvatar] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(0);

  useEffect(() => {
    web3Init((obj) => {
      let web3 = obj.web3;
      setAccounts(obj.accounts);
      const av = avatar(obj.defaultAccount, { size: 32, round: false });
      setAvatar(av + "");

      web3.eth.subscribe("pendingTransactions", (err, resp) => {
        console.log(resp, err);
        reloadBalance(window.acc);
      });
    });
  }, []);

  const onGreet = async () => {
    const resp = await getMethod("greet");
    console.log(resp);
  };

  const setGreetings = async () => {
    const resp = await getMethod("setGreeting", "Hi, new greedhdgdfdftigs..!!");
  };

  const reloadBalance = (value = null) => {
    let { web3 } = window.web3Obj;
    web3.eth.getBalance(value).then((resp) => {
      setBalance(web3.utils.fromWei(resp));
    });
  };

  const onChangeAccount = async ({ target: { value } }) => {
    const av = avatar(value, { size: 32, round: false });
    setAvatar(av + "");
    setSelectedAccount(value);
    window.acc = value;
    reloadBalance(value);
  };

  return (
    <div>
      <div className="text-3xl font-bold flex items-center justify-end p-4">
        <div className="border rounded flex items-center px-2 p-1">
          <div
            dangerouslySetInnerHTML={{ __html: avt }}
            className="rounded overflow-hidden"
          />
          <div className="flex flex-col">
            <select
              className="text-sm font-bold text-gray-500 w-32 ml-1"
              onChange={onChangeAccount}
            >
              {accounts.map((acc) => (
                <option value={acc} key={acc}>
                  {acc.slice(0, 12)}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 ml-1 flex items-center">
              <FaEthereum></FaEthereum>
              {parseFloat(balance + "").toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}

      <div>
        <ContractForm abi={contractAbi.abi} />
      </div>

      <button
        onClick={onGreet}
        className="text-sm px-5 p-3 border rounded h-12"
      >
        Greet
      </button>
      <button
        onClick={setGreetings}
        className="text-sm px-5 p-3 border rounded h-12"
      >
        Set Greet
      </button>
    </div>
  );
}

export default App;
