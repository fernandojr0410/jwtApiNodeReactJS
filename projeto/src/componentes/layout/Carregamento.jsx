import carregamento from "../../img/loading.svg";
import styles from "./Carragamento.module.css";

function Carregamento() {
  return (
    <div className={styles.carregamento_container}>
      <img
        className={styles.carregamento}
        src={carregamento}
        alt="Carregamento"
      />
    </div>
  );
}

export default Carregamento;
