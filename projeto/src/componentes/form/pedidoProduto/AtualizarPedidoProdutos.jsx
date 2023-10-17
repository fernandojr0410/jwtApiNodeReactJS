import { useState } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarPedidoProdutos() {
  const [id_pedido, setIdPedido] = useState("");
  const [id_produto, setIdProduto] = useState("");

  const [idPedidoError, setIdPedidoError] = useState("");
  const [idProdutoError, setIdProdutoError] = useState("");
  const [erroAoAtualizar, setErroAoAtualizar] = useState(false);

  const [formularioValido, setFormularioValido] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const validarFormulario = () => {
    if (idProdutoError === "" && id_produto !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
    if (idPedidoError === "" && id_pedido !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (id_pedido === "") {
      setIdPedidoError("Preencha o ID do Pedido");
    } else {
      setIdPedidoError("");
    }
    if (id_produto === "") {
      setIdProdutoError("Preencha o ID do Produto");
    } else {
      setIdProdutoError("");
    }

    const camposAtualizados = {
      id_pedido: id_pedido,
      id_produto: id_produto,
    };

    fetch(
      `http://localhost:6050/itens_pedidos/update/${id_pedido}/${id_produto}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(camposAtualizados),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        if (response.status === 200) {
          console.log("Pedido e Produto atualizado com sucesso!");
          setIdPedido("");
          setIdProduto("");
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErroAoAtualizar(true);
        setModalAberto(true);
      });
  };

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleIdProdutoChange = (event) => {
    setIdProduto(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Pedido e Produto</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idPedidoError ? styles.label_error : ""}>
                ID Pedido *
              </label>
              <input
                type="text"
                name="id_pedido"
                style={{ borderColor: idPedidoError ? "red" : "" }}
                placeholder="Digite o Id Pedido..."
                value={id_pedido}
                onChange={handleIdPedidoChange}
              />
              {idPedidoError && (
                <span className={styles.error_mensagem}>{idPedidoError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={idProdutoError ? styles.label_error : ""}>
                ID Produto *
              </label>
              <input
                type="text"
                name="id_produto"
                style={{ borderColor: idProdutoError ? "red" : "" }}
                placeholder="Digite o Id do Produto..."
                value={id_produto}
                onChange={handleIdProdutoChange}
              />
              {idProdutoError && (
                <span className={styles.error_mensagem}>{idProdutoError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Atualizar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {modalAberto && (
        <Modal
          mensagem="Pedido e Produto atualizado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/pedidoProduto"
        />
      )}
    </div>
  );
}

export default AtualizarPedidoProdutos;
