import { useState } from "react";
import { useForm } from "react-hook-form";
import { getMethod } from "./components";
import { produce } from "immer";

const CText = (props) => {
  const { register, ...others } = props;
  return (
    <input
      {...others}
      {...register(props.name)}
      className="text-sm p-2 px-4 rounded border w-full"
    ></input>
  );
};

const CButton = (props) => {
  return (
    <button
      type="submit"
      {...props}
      className="rounded px-3 p-2 h-full bg-indigo-400 w-full text-white text-sm shadow shadow-indigo-300"
    >
      {props.children}
    </button>
  );
};

const ContractForm = ({ abi }) => {
  console.log(abi);

  const { register, handleSubmit } = useForm();
  const [formMap, setFormMap] = useState({});

  const Inputs = ({ inputs, register, fieldName }) => {
    if (inputs.length) {
      return inputs.map((item, i) => (
        <CText
          key={i}
          placeholder={item.name}
          name={fieldName}
          register={register}
        ></CText>
      ));
    }
  };

  const Outputs = ({ outputs, register, fieldName, value }) => {
    if (outputs.length) {
      return outputs.map((item, i) => (
        <CText
          key={i}
          disabled
          placeholder={fieldName}
          name={fieldName}
          register={register}
          value={value}
        ></CText>
      ));
    }
  };

  const onSubmit = (data, event) => {
    const buttonClicked = event.nativeEvent.submitter.name;
    const { contract } = window.web3Obj;
    console.log(data);
    getMethod(contract, buttonClicked).then((resp) => {
      // const value = produce(formMap, (draft) => {
      //   draft[buttonClicked] = resp;
      // });
      console.log(resp);
      setFormMap({
        ...formMap,
        [buttonClicked]: resp,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-lg m-auto divide-y">
        {abi.map((item, i) => {
          if (item.name) {
            return (
              <div className="flex py-2 gap-2" key={i}>
                <div className="w-1/3">
                  <CButton name={item.name}>{item.name}</CButton>
                </div>
                <div className="w-2/3 flex">
                  {Inputs({
                    inputs: item.inputs,
                    register,
                    fieldName: item.name,
                  })}
                  {Outputs({
                    outputs: item.outputs,
                    register,
                    fieldName: item.name,
                    value: formMap[item.name],
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </form>
  );
};

export { ContractForm, CText, CButton };
