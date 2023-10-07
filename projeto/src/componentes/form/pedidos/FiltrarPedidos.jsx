import { useState, useEffect } from "react";
import ListaPedidos from "./ListaPedidos";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function FiltrarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [idPedido, setIdPedido] = useState("");
  const [PedidoInvalido, setPedidoInvalido] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/pedidos/findAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        setPedidos(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pedido:", error);
      });
  }, []);

  const buscarPedidoId = () => {
    if (!idPedido) return;

    fetch(`http://localhost:6050/pedidos/findById?id=${idPedido}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.dados || data.dados.length === 0) {
          setPedidoInvalido(true);
        } else {
          setPedidoInvalido(false);
          setPedidos(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionário:", error);
      });
  };

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <small className={styles.usuario}>
        <span>Usuário:</span> {pedidos?.dadosUsuario?.nome}
      </small>
      <div className={styles.input_funcionario_id}>
        <input
          type="input"
          name="idPedido"
          placeholder="Digite o Id Pedido..."
          value={idPedido}
          onChange={handleIdPedidoChange}
        />
        <button type="button" onClick={buscarPedidoId}>
          Buscar
        </button>
      </div>

      {PedidoInvalido && (
        <Modal
          mensagem="Pedido não encontrado. Tente novamente."
          onClose={() => setPedidoInvalido(false)}
        />
      )}

      <ListaPedidos pedidos={pedidos} />
    </div>
  );
}

export default FiltrarPedidos;
