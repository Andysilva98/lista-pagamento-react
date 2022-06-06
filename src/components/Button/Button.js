import styles from "./Button.module.css";
import PopUp from "../PopUp/PopUp";

export default function Button({ type, id, text, state, name }) {
  return (
    <>
      <button type={type} className={styles.button} key={id}>
        {text}
      </button>
    </>
  );
}
