import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function Contas({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarContas" token={token}>
            <span>Filtrar Conta</span>
          </Link>

          <Link to="/cadastrarContas" token={token}>
            <span>Cadastrar Conta</span>
          </Link>
          <Link to="/atualizarContas" token={token}>
            <span>Atualizar Conta</span>
          </Link>
          <Link to="/deletarContasId" token={token}>
            <span>Deletar Conta</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contas;
