import styles from "./Select.module.css";

export default function Select({ options }) {
  return (
    <select className={styles.select}>
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option value={option.card_number}>
          Cartão com final {option.card_number.substr(-4)}
        </option>
      ))}
    </select>
  );
}
