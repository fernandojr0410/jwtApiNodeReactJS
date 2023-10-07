import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function Pedidos({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarPedidos" token={token}>
            <span>Filtrar Pedidos</span>
          </Link>

          <Link to="/cadastrarPedidos" token={token}>
            <span>Cadastrar Pedidos</span>
          </Link>
          <Link to="/atualizarPedidos">
            <span>Atualizar Pedidos</span>
          </Link>
          <Link to="/deletarPedidosId" token={token}>
            <span>Deletar Pedidos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
