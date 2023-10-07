import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function DeletarClientesId() {
  const [idCliente, setIdCliente] = useState("");
  const [idClienteError, setIdClienteError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [registroDeletado, setRegistroDeletado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [idCliente, idClienteError]);

  const validarFormulario = () => {
    if (idClienteError === "" && idCliente !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (idCliente === "") {
      setIdClienteError("Insira o ID do Cliente");
    } else {
      setIdClienteError("");
    }

    if (idCliente === "") {
      console.error("Nenhum ID foi especificado para exclusão.");
      return;
    }

    const idDelete = idCliente.split(",").map((id) => parseInt(id.trim()));

    fetch(`http://localhost:6050/clientes/delete?id=${idCliente}`, {
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
          console.log("Cliente deletado com sucesso!");
          setRegistroDeletado(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o cliente:", error);
      });
  };

  const handleIdClienteChange = (event) => {
    setIdCliente(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Deletar Cliente ID</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idClienteError ? styles.label_error : ""}>
                ID Cliente *
              </label>
              <input
                type="text"
                name="idCliente"
                style={{ borderColor: idClienteError ? "red" : "" }}
                placeholder="Digite o Id Cliente..."
                value={idCliente}
                onChange={handleIdClienteChange}
              />
              {idClienteError && (
                <span className={styles.error_mensagem}>{idClienteError}</span>
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
          mensagem="Cliente deletado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/clientes"
        />
      )}
    </div>
  );
}

export default DeletarClientesId;
