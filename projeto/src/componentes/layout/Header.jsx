import { Link } from "react-router-dom";
import logo from "../../img/logo_empresa.png";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <div className={styles.header_container}>
      <Link>
        <img src={logo} alt="Logo Empresa" />
      </Link>

      <ul className={styles.lista_header}>
        <Link to="/home">
          <li className={styles.item}>Home</li>
        </Link>

        <Link to="/funcionarios">
          <li className={styles.item}>Funcionários</li>
        </Link>

        <Link to="/clientes">
          <li className={styles.item}>Clientes</li>
        </Link>

        <Link to="/produtos">
          <li className={styles.item}>Produtos</li>
        </Link>

        <Link to="/pedidos">
          <li className={styles.item}>Pedidos</li>
        </Link>

        <Link to="/contas">
          <li className={styles.item}>Contas</li>
        </Link>
        <Link to="/pedidoConta">
          <li className={styles.item}>Pedido Conta</li>
        </Link>

        <Link to="/relatorios">
          <li className={styles.item}>Relatórios</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
