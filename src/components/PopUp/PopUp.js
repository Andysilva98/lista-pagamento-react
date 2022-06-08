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

    const jsonParam = {
      card_number: inputOption,
      cvv: cards[i].cvv,
      expiry_date: cards[i].expiry_date,
      destination_user_id: user.id,
      value: inputValue,
    };

    console.log(jsonParam);
    //fetch(
    // "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
    // jsonParam
    //
    // .then((dados) => dados.json())
    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((err) => console.log(err));
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p>
            Pagamento para <span>{user.name}</span>
          </p>
          <Button text="Fechar" onClick={() => setShowModal(false)} />
        </div>

        <form onSubmit={submit} className={styles.body}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
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
      </div>
    </div>
  );
}
