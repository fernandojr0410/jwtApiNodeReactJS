import { useState, useEffect } from "react";
import ListaContas from "./ListaContas";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function FiltrarContas() {
  const [contas, setContas] = useState("");
  const [idConta, setIdconta] = useState("");

  const [contaInvalida, setContaInvalida] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/contas/findAll", {
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
        setContas(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Conta:", error);
      });
  }, []);

  const buscarIdConta = () => {
    if (!idConta) return;

    fetch(`http://localhost:6050/contas/findById?id=${idConta}`, {
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
          setContaInvalida(true);
        } else {
          setContaInvalida(false);
          setContas(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar conta:", error);
      });
  };

  const handleIdContaChange = (event) => {
    setIdconta(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <small className={styles.usuario}>
        <span>Usuário:</span> {contas?.dadosUsuario?.nome}
      </small>
      <div className={styles.input_funcionario_id}>
        <input
          type="input"
          name="idConta"
          placeholder="Digite o Id da Conta..."
          value={idConta}
          onChange={handleIdContaChange}
        />
        <button type="button" onClick={buscarIdConta}>
          Buscar
        </button>
      </div>

      {contaInvalida && (
        <Modal
          mensagem="Conta não encontrado. Tente novamente."
          onClose={() => setContaInvalida(false)}
        />
      )}

      <ListaContas contas={contas} />
    </div>
  );
}

export default FiltrarContas;
