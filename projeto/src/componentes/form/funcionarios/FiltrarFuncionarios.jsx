import { useState, useEffect } from "react";
import ListaFuncionarios from "./ListaFuncionarios";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function FiltrarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [idFuncionario, setIdFuncionario] = useState("");
  const [funcionarioInvalido, setFuncionarioInvalido] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/funcionarios/findAll", {
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
        setFuncionarios(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionário:", error);
      });
  }, []);

  const buscarFuncionariosId = () => {
    if (!idFuncionario) return;

    fetch(`http://localhost:6050/funcionarios/findById?id=${idFuncionario}`, {
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
          setFuncionarioInvalido(true);
        } else {
          setFuncionarioInvalido(false);
          setFuncionarios(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionário:", error);
      });
  };

  const handleIdFuncionarioChange = (event) => {
    setIdFuncionario(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <small className={styles.usuario}>
        <span>Usuário:</span> {funcionarios?.dadosUsuario?.nome}
      </small>
      <div className={styles.input_funcionario_id}>
        <input
          type="input"
          name="idFuncionario"
          placeholder="Digite o Id Funcionário..."
          value={idFuncionario}
          onChange={handleIdFuncionarioChange}
        />
        <button type="button" onClick={buscarFuncionariosId}>
          Buscar
        </button>
      </div>

      {funcionarioInvalido && (
        <Modal
          mensagem="Funcionário não encontrado. Tente novamente."
          onClose={() => setFuncionarioInvalido(false)}
        />
      )}

      <ListaFuncionarios funcionarios={funcionarios} />
    </div>
  );
}

export default FiltrarFuncionarios;
