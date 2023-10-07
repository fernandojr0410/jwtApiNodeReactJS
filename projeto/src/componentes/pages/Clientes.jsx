import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function Clientes({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarCliente" token={token}>
            <span>Filtrar Clientes</span>
          </Link>

          <Link to="/cadastrarCliente" token={token}>
            <span>Cadastrar Clientes</span>
          </Link>
          <Link to="/atualizarClientes">
            <span>Atualizar Clientes</span>
          </Link>
          <Link to="/deletarClientesId" token={token}>
            <span>Deletar Clientes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
