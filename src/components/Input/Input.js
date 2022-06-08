import styles from "./Input.module.css";

export default function Input({ value, onChange }) {
  return (
    <input
      type="number"
      placeholder="RS 0,00"
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
}
