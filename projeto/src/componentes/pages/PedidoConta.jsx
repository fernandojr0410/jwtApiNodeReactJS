import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function PedidoConta({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarPedidoContas" token={token}>
            <span>Filtrar Pedido Conta</span>
          </Link>

          <Link to="/cadastrarPedidoContas" token={token}>
            <span>Cadastrar Pedido Conta</span>
          </Link>
          <Link to="/atualizarPedidoContas" token={token}>
            <span>Atualizar Pedido Conta</span>
          </Link>
          <Link to="/deletarPedidoContas" token={token}>
            <span>Deletar Pedido Conta</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PedidoConta;
