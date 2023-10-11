import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function PedidoConta({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarPedidoContas" token={token}>
            <span>Filtrar Conta Pedido</span>
          </Link>

          <Link to="/cadastrarContasPedidos" token={token}>
            <span>Cadastrar Conta Pedido</span>
          </Link>
          <Link to="/atualizarContasPedidos" token={token}>
            <span>Atualizar Conta Pedido</span>
          </Link>
          <Link to="/deletarContasPedidosId" token={token}>
            <span>Deletar Conta Pedido</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PedidoConta;
