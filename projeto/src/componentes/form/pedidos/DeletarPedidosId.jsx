import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function DeletarPedidosId() {
  const [id_pedido, setid_pedido] = useState("");
  const [id_pedidoError, setid_pedidoError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [registroDeletado, setRegistroDeletado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [id_pedido, id_pedidoError]);

  const validarFormulario = () => {
    if (id_pedidoError === "" && id_pedido !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (id_pedido === "") {
      setid_pedidoError("Insira o ID do Produto");
    } else {
      setid_pedidoError("");
    }

    if (id_pedido === "") {
      console.error("Nenhum ID foi especificado para exclusão.");
      return;
    }

    const idDelete = id_pedido.split(",").map((id) => parseInt(id.trim()));

    fetch(`http://localhost:6050/pedidos/delete?id=${id_pedido}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ ids: idDelete }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }

        if (response.status === 200) {
          console.log("Produto deletado com sucesso!");
          setRegistroDeletado(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o produto:", error);
      });
  };

  const handleid_pedidoChange = (event) => {
    setid_pedido(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Deletar Pedido ID</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={id_pedidoError ? styles.label_error : ""}>
                ID Produto *
              </label>
              <input
                type="text"
                name="id_pedido"
                style={{ borderColor: id_pedidoError ? "red" : "" }}
                placeholder="Digite o Id Pedido..."
                value={id_pedido}
                onChange={handleid_pedidoChange}
              />
              {id_pedidoError && (
                <span className={styles.error_mensagem}>{id_pedidoError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Deletar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {modalAberto && (
        <Modal
          mensagem="Produto deletado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/pedidos"
        />
      )}
    </div>
  );
}

export default DeletarPedidosId;
