import styles from "./PopUp.module.css";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

export default function PopUp({ name, id }) {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputOption, setInputOption] = useState("");

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
      cvv: "",
      expiry_date: "",
      destination_user_id: name,
      value: inputValue,
    };
    console.log(jsonParam);

    fetch(
      "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
      jsonParam
    )
      .then((dados) => dados.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          Pagamento para <span>{name}</span>
        </div>

        <form onSubmit={submit} className={styles.body}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Select
            options={cards}
            value={inputOption.text}
            onChange={(e) =>
              setInputOption(e.target.options[e.target.selectedIndex])
            }
          />
          <Button type="submit" text={"Pagar"} onClick={submit} />
        </form>
      </div>
    </div>
  );
}
