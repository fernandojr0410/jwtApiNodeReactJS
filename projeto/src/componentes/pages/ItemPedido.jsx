import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function ItemPedido({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarPedidoProduto" token={token}>
            <span>Filtrar Pedido Produto</span>
          </Link>

          <Link to="/cadastrarPedidoContas" token={token}>
            <span>Cadastrar Pedido Produto</span>
          </Link>
          <Link to="/atualizarPedidoContas" token={token}>
            <span>Atualizar Pedido Produto</span>
          </Link>
          <Link to="/deletarPedidoContas" token={token}>
            <span>Deletar Pedido Produto</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemPedido;
