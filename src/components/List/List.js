import styles from "./List.module.css";
import Button from "../Button/Button";
import PopUp from "../PopUp/PopUp";

import { useState, useEffect } from "react";

export default function List() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce") //fetch busca os dados de uma api ou documento externo
      .then((resp) => resp.json()) // cria a função que passa um parametro que recebe os dados, a função transforma os dados JSON
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      {users.map((user) => (
        <div className={styles.container} key={user.id}>
          <img className={styles.img} src={user.img} />
          <div className={styles.text}>
            <div>{user.name}</div>
            <div>{`ID: ${user.id} - Username: ${user.username}`} </div>
          </div>
          <Button
            id={user.id}
            text="Pagar"
            name={user.name}
            onClick={() => <PopUp name={user.name} />}
          />
        </div>
      ))}
    </>
  );
}
