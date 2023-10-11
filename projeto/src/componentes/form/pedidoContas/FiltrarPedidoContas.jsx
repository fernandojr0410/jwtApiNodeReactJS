import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";
import ListaPedidoContas from "./ListaPedidoContas";

function FiltrarPedidoContas() {
  const [pedidoContas, setPedidoContas] = useState([]);
  const [id_pedido, setIdPedido] = useState("");
  const [id_conta, setIdConta] = useState(""); // Novo campo para ID da Conta
  const [contaInvalida, setContaInvalida] = useState(false);
  const [pedidoInvalido, setPedidoInvalido] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/pedidos_contas/findAll", {
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
        setPedidoContas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pedido e Conta:", error);
      });
  }, []);

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleIdContaChange = (event) => {
    setIdConta(event.target.value);
  };

  const buscarIdPedidoConta = () => {
    if (!id_pedido || !id_conta) return;

    fetch(
      `http://localhost:6050/pedidos_contas/findById?id_pedido=${id_pedido}&id_conta=${id_conta}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          setContaInvalida(true);
          setPedidoInvalido(true);
        } else {
          setContaInvalida(false);
          setPedidoInvalido(false);
          setPedidoContas(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar Pedido e Conta:", error);
      });
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.usuario}>
        <span>Usuário: fernandojr</span>
      </div>

      <div className={styles.input_funcionario_id}>
        <input
          type="text"
          name="idPedido"
          placeholder="Digite o ID do Pedido..."
          value={id_pedido}
          onChange={handleIdPedidoChange}
        />
        <input
          type="text"
          name="idConta"
          placeholder="Digite o ID da Conta..."
          value={id_conta}
          onChange={handleIdContaChange}
        />
        <button type="button" onClick={buscarIdPedidoConta}>
          Buscar
        </button>
      </div>

      {contaInvalida && pedidoInvalido && (
        <Modal
          mensagem="Pedido e Conta não encontrados. Tente novamente."
          onClose={() => {
            setContaInvalida(false);
            setPedidoInvalido(false);
          }}
        />
      )}

      <ListaPedidoContas pedidoContas={pedidoContas} />
    </div>
  );
}

export default FiltrarPedidoContas;
