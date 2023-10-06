import { useState, useEffect } from "react";
// import Modal from "../layout/Modal";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Carregamento from "../layout/Carregamento";
import styles from "../../styles/FiltrarFuncionario.module.css";

function DeletarFuncionariosId() {
  const [idFuncionario, setIdFuncionario] = useState("");
  const [idFuncionarioError, setIdFuncionarioError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [idFuncionario, idFuncionarioError]);

  const validarFormulario = () => {
    if (idFuncionarioError === "" && idFuncionario !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (idFuncionario === "") {
      setIdFuncionarioError("Insira o ID do Funcionário");
    } else {
      setIdFuncionarioError("");
    }

    if (idFuncionario === "") {
      console.error("Nenhum ID foi especificado para exclusão.");
      return;
    }

    const idDelete = idFuncionario.split(",").map((id) => parseInt(id.trim()));

    fetch(`http://localhost:6050/funcionarios/delete?id=${idFuncionario}`, {
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
          console.log("Funcionário deletado com sucesso!");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o funcionário:", error);
      });
  };

  const handleIdFuncionarioChange = (event) => {
    setIdFuncionario(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Deletar Funcionários ID</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idFuncionarioError ? styles.label_error : ""}>
                ID Funcionário *
              </label>
              <input
                type="text"
                name="idFuncionario"
                style={{ borderColor: idFuncionarioError ? "red" : "" }}
                placeholder="Digite o Id Funcionário..."
                value={idFuncionario}
                onChange={handleIdFuncionarioChange}
              />
              {idFuncionarioError && (
                <span className={styles.error_mensagem}>
                  {idFuncionarioError}
                </span>
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
    </div>
  );
}

export default DeletarFuncionariosId;
