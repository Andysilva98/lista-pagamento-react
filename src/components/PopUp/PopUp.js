import styles from "./PopUp.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

export default function PopUp({ user, setShowModal }) {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputOption, setInputOption] = useState("");
  const [i, setI] = useState("");
  const [formValues, setFormValues] = useState({});
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/cards", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function submit(e) {
    e.preventDefault();

    if (inputValue == "" || inputValue == "0,00") {
      alert("Preencha todos os campos!");
      return;
    }

    const jsonParam = {
      card_number: inputOption,
      cvv: cards[i].cvv,
      expiry_date: cards[i].expiry_date,
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

  function formatCurrency(v) {
    console.log("valor do " + v);
    if (v == "") {
      return;
    }
    let value = v + "";

    value = parseInt(value.replace(/[^0-9]+/g, ""));
    value = value + "";

    if (value.length == 1) {
      value = value.replace(/([0-9]{1})$/g, "0,0$1");
    } else if (value.length == 2) {
      value = value.replace(/([0-9]{2})$/g, "0,$1");
    } else if (value.length > 2) {
      value = value.replace(/([0-9]{2}$)/g, ",$1");
    }

    if (value.length >= 6) {
      let inicio = value.slice(0, value.length - 3);
      let final = value.slice(value.length - 3, value.length);

      inicio = +inicio;
      inicio = inicio.toLocaleString("pt-br");

      value = inicio + final;
    }

    if (value == "NaN") value = "";
    setInputValue(value);
    return inputValue;
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
            <Input
              onChange={(e) => {
                formatCurrency(e.target.value);
              }}
              value={inputValue}
            />
            <Select
              options={cards}
              value={inputOption}
              onChange={(e) => {
                setInputOption(e.target.value);
                setI(e.target.selectedIndex - 1);
              }}
            />
            <Button type="submit" text={"Pagar"} onClick={submit} />
          </form>
        )}
      </div>
    </div>
  );
}
