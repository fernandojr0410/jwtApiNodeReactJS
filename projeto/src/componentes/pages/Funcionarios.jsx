import { Link } from "react-router-dom";
import styles from "../layout/Funcionarios.module.css";

function Funcionarios() {
  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Qual opção deseja?</h1>

        <div className={styles.lista_menus}>
        <Link to="/loginFuncionario">
            <span>Logar Funcionário</span>
          </Link>
          <Link to="/filtrarFuncionario">
            <span>Filtrar Funcionários</span>
          </Link>
          <Link to="/cadastrarFuncionario">
            <span>Cadastrar Funcionários</span>
          </Link>
          <Link>
            <span>Atualizar Funcionários</span>
          </Link>
          <Link>
            <span>Deletar Funcionários</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Funcionarios;
