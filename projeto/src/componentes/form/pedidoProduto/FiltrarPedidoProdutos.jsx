import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";
import ListaPedidoProdutos from "./ListaPedidoProduto";

function FiltrarPedidoProdutos() {
  const [pedidoProdutos, setPedidoProdutos] = useState([]);
  const [id_pedido, setIdPedido] = useState("");
  const [id_produto, setIdProduto] = useState("");
  const [pedidoInvalido, setPedidoInvalido] = useState(false);
  const [produtoInvalido, setProdutoInvalido] = useState(false);
  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/itens_pedidos/findAll", {
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
        setPedidoProdutos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pedido e Produto:", error);
      });
  }, []);

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleIdProdutoChange = (event) => {
    setIdProduto(event.target.value);
  };

  const buscarIdPedidoProduto = () => {
    if (!id_pedido || !id_produto) return;

    fetch(
      `http://localhost:6050/itens_pedidos/findById?id_pedido=${id_pedido}&id_produto=${id_produto}`,
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
          setPedidoInvalido(true);
          setProdutoInvalido(true);
        } else {
          setPedidoInvalido(false);
          setProdutoInvalido(false);
          setPedidoProdutos(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar Pedido e Produto:", error);
      });
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.usuario}>
        <small className={styles.usuario}>
          <span>Usuário:</span> {pedidoProdutos?.dadosUsuario?.nome}
        </small>
      </div>

      <div className={styles.input_funcionario_id}>
        <input
          type="text"
          name="id_pedido"
          placeholder="Digite o ID do Pedido..."
          value={id_pedido}
          onChange={handleIdPedidoChange}
        />
        <input
          type="text"
          name="idProduto"
          placeholder="Digite o ID do Produto..."
          value={id_produto}
          onChange={handleIdProdutoChange}
        />
        <button type="button" onClick={buscarIdPedidoProduto}>
          Buscar
        </button>
      </div>

      {produtoInvalido && pedidoInvalido && (
        <Modal
          mensagem="Pedido e Produto não encontrados. Tente novamente."
          onClose={() => {
            setPedidoInvalido(false);
            setProdutoInvalido(false);
          }}
        />
      )}

      <ListaPedidoProdutos pedidoProdutos={pedidoProdutos} />
    </div>
  );
}

export default FiltrarPedidoProdutos;
