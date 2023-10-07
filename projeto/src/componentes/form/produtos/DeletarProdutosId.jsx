import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function DeletarProdutosId() {
  const [idProduto, setIdProduto] = useState("");
  const [idProdutoError, setIdProdutoError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [registroDeletado, setRegistroDeletado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [idProduto, idProdutoError]);

  const validarFormulario = () => {
    if (idProdutoError === "" && idProduto !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (idProduto === "") {
      setIdProdutoError("Insira o ID do Produto");
    } else {
      setIdProdutoError("");
    }

    if (idProduto === "") {
      console.error("Nenhum ID foi especificado para exclusão.");
      return;
    }

    const idDelete = idProduto.split(",").map((id) => parseInt(id.trim()));

    fetch(`http://localhost:6050/produtos/delete?id=${idProduto}`, {
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

  const handleIdProdutoChange = (event) => {
    setIdProduto(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Deletar Produtos ID</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idProdutoError ? styles.label_error : ""}>
                ID Produto *
              </label>
              <input
                type="text"
                name="idProduto"
                style={{ borderColor: idProdutoError ? "red" : "" }}
                placeholder="Digite o Id Produto..."
                value={idProduto}
                onChange={handleIdProdutoChange}
              />
              {idProdutoError && (
                <span className={styles.error_mensagem}>{idProdutoError}</span>
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
          link="/produtos"
        />
      )}
    </div>
  );
}

export default DeletarProdutosId;
