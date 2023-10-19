import { useState, useEffect } from "react";
import styles from "../styles/Relatorios.module.css";

function Relatorios() {
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [idPedido, setIdPedido] = useState("");
  const [error, setError] = useState(null);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const fetchRelatorio = async () => {
    try {
      const response = await fetch(
        `http://localhost:6050/relatorio_cozinha/${idPedido}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      if (data.length === 0) {
        setError("Nenhum relatório encontrado para o ID inserido.");
      } else {
        setDadosRelatorio(data);
        setError(null);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados do relatório", error);
      setError(
        "Erro ao recuperar dados do relatório. Por favor, tente novamente."
      );
    }
  };

  const handleFilter = () => {
    fetchRelatorio();
  };

  return (
    <div>
      <h1>Relatório</h1>
      <div>
        <input
          type="text"
          placeholder="Insira o ID do relatório de cozinha"
          value={idPedido}
          onChange={(e) => setIdPedido(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
      {error && <p>{error}</p>}
      {dadosRelatorio.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Pedido</th>
              <th>Conta</th>
              <th>Quantidade de Pessoas</th>
              <th>Total da Conta</th>
              <th>Valor Individual</th>
              <th>Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {dadosRelatorio.map((item, index) => (
              <tr key={index}>
                <td>{item.funcionario.nome}</td>
                <td>{item.cliente.nome}</td>
                <td>{item.produto.nome}</td>
                <td>{item.pedido.id_pedido}</td>
                <td>{item.conta.id_conta}</td>
                <td>{item.conta.quantidade_pessoa}</td>
                <td>{item.conta.total_conta}</td>
                <td>{item.conta.valor_individual}</td>
                <td>{item.conta.pagamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Relatorios;
