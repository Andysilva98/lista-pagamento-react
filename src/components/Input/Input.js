import styles from "./Input.module.css";

export default function Input({ inputValue, setInputValue }) {
  let formatCurrency = (v) => {
    console.log("valor do " + v);
    if (v === "") {
      return;
    }
    let value = v;

    // O script abaixo pega o valor que foi recebido por parametro
    // retira qualquer caracter que não seja um number e transforma
    // em string preparando o valor para a mascara
    value = parseInt(value.replace(/[^0-9]+/g, ""));
    value = value + "";

    // Após o filtro realizado acima, é criado o inicio da mascara que
    // vai criar as casas decimais com o formato da moeda BR
    if (value.length === 1) {
      value = value.replace(/([0-9]{1})$/g, "0,0$1");
    } else if (value.length === 2) {
      value = value.replace(/([0-9]{2})$/g, "0,$1");
    } else if (value.length > 2) {
      value = value.replace(/([0-9]{2}$)/g, ",$1");
    }

    // O script abaixo separa os 6 caracteres onde tem a virgula no meio e
    // salva na variavel final e pega todo o restante e salva na variavel
    // inicio que convete os numeros com casas decimais
    if (value.length >= 6) {
      let start = value.slice(0, value.length - 3);
      let end = value.slice(value.length - 3, value.length);

      start = +start;
      start = start.toLocaleString("pt-br");

      value = start + end;
    }

    if (value === "NaN") value = "";
    setInputValue(value);
    return inputValue;
  };

  return (
    <input
      type="text"
      placeholder="RS 0,00"
      className={styles.input}
      value={inputValue}
      onChange={(e) => {
        formatCurrency(e.target.value);
      }}
      required
    />
  );
}
