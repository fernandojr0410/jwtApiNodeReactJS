import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/LoginFuncionario.module.css";

function DeletarContasId() {
  const [id_conta, setIdConta] = useState("");
  const [idContaError, setIdContaError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [registroDeletado, setRegistroDeletado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [id_conta, setIdContaError]);

  const validarFormulario = () => {
    if (setIdContaError === "" && id_conta !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (id_conta === "") {
      setIdContaError("Insira o ID da Conta");
    } else {
      setIdContaError("");
    }

    if (id_conta === "") {
      console.error("Nenhum ID foi especificado para exclusão.");
      return;
    }

    const idDelete = id_conta.split(",").map((id) => parseInt(id.trim()));

    fetch(`http://localhost:6050/contas/delete?id=${id_conta}`, {
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
          console.log("Conta deletada com sucesso!");
          setRegistroDeletado(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir a Conta:", error);
      });
  };

  const handleIdContaChange = (event) => {
    setIdConta(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Deletar Conta ID</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idContaError ? styles.label_error : ""}>
                ID Conta *
              </label>
              <input
                type="text"
                name="id_conta"
                style={{ borderColor: idContaError ? "red" : "" }}
                placeholder="Digite o Id da Conta..."
                value={id_conta}
                onChange={handleIdContaChange}
              />
              {idContaError && (
                <span className={styles.error_mensagem}>{idContaError}</span>
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
          mensagem="Conta deletada com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/contas"
        />
      )}
    </div>
  );
}

export default DeletarContasId;
