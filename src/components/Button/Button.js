import styles from "./Button.module.css";

export default function Button({ type, id, text, onClick }) {
  return (
    <>
      <button type={type} className={styles.button} key={id} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
