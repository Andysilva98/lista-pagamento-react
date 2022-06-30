import styles from "./PopUp.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useState } from "react";

export default function PopUp({ user, setShowModal }) {
  const [inputValue, setInputValue] = useState("");
  const [inputOption, setInputOption] = useState("");
  const [index, setIndex] = useState("");
  const [transaction, setTransaction] = useState("");

  const cards = [
    {
      card_number: "1111111111111111",
      cvv: 789,
      expiry_date: "01/18",
    },
    {
      card_number: "4111111111111234",
      cvv: 123,
      expiry_date: "01/20",
    },
  ];

  function submit(e) {
    e.preventDefault();

    if (inputOption === "" || inputValue === "0,00") {
      alert("Preencha todos os campos!");
      return;
    }

    const jsonParam = {
      card_number: inputOption,
      cvv: cards[index].cvv,
      expiry_date: cards[index].expiry_date,
      destination_user_id: user.id,
      value: inputValue,
    };

    console.log(jsonParam);
    fetch(
      "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
      jsonParam
    )
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);

        if (result.status === "Aprovada") {
          setTransaction("Pagamento Concluído Com Sucesso!");
        } else {
          setTransaction("Pagamento NÃO foi Concluído com Sucesso!");
        }
      });
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {transaction ? (
            <p>
              Recibo de pagamento
              <span></span>
            </p>
          ) : (
            <p>
              Pagamento para <span>{user.name}</span>
            </p>
          )}

          <Button text="Fechar" onClick={() => setShowModal(false)} />
        </div>

        {transaction ? (
          <p className={styles.transaction}>{transaction}</p>
        ) : (
          <form onSubmit={submit} className={styles.body}>
            <Input inputValue={inputValue} setInputValue={setInputValue} />
            <Select
              options={cards}
              value={inputOption}
              onChange={(e) => {
                setInputOption(e.target.value);
                setIndex(e.target.selectedIndex - 1);
              }}
            />
            <Button type="submit" text={"Pagar"} onClick={submit} />
          </form>
        )}
      </div>
    </div>
  );
}
