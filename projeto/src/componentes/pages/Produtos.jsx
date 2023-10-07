import { Link } from "react-router-dom";
import styles from "../styles/Funcionarios.module.css";

function Produtos({ token }) {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
          <Link to="/filtrarProdutos" token={token}>
            <span>Filtrar Produtos</span>
          </Link>

          <Link to="/cadastrarProdutos" token={token}>
            <span>Cadastrar Produtos</span>
          </Link>
          <Link to="/atualizarProdutos" token={token}>
            <span>Atualizar Produtos</span>
          </Link>
          <Link to="/deletarProdutosId" token={token}>
            <span>Deletar Produtos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
