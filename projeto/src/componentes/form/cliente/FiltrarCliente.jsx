import { useState, useEffect } from "react";
import ListaCliente from "./ListaClientes";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function FiltrarCliente() {
  const [clientes, setClientes] = useState([]);
  const [idCliente, setIdCliente] = useState("");
  const [clienteInvalido, setClienteInvalido] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/clientes/findAll", {
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
        setClientes(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Cliente:", error);
      });
  }, []);

  const buscarClientesId = () => {
    if (!idCliente) return;

    fetch(`http://localhost:6050/clientes/findById?id=${idCliente}`, {
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
          setClienteInvalido(true);
        } else {
          setClienteInvalido(false);
          setClientes(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar Cliente:", error);
      });
  };

  const handleIdFuncionarioChange = (event) => {
    setIdCliente(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <small className={styles.usuario}>
        <span>Usuário:</span> {clientes?.dadosUsuario?.nome}
      </small>
      <div className={styles.input_funcionario_id}>
        <input
          type="number"
          name="idCliente"
          placeholder="Digite o Id Cliente..."
          value={idCliente}
          onChange={handleIdFuncionarioChange}
        />
        <button type="button" onClick={buscarClientesId}>
          Buscar
        </button>
      </div>

      {clienteInvalido && (
        <Modal
          mensagem="Cliente não encontrado. Tente novamente."
          onClose={() => setClienteInvalido(false)}
        />
      )}

      <ListaCliente clientes={clientes} />
    </div>
  );
}

export default FiltrarCliente;
