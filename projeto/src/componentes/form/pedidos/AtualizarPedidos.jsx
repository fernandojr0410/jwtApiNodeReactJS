import { useState } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarPedidos() {
  const [id_pedido, setId_pedido] = useState("");
  const [id_pedidoError, setId_pedidoError] = useState("");

  const [id_funcionario, setId_funcionario] = useState("");
  const [id_funcionarioError, setId_funcionarioError] = useState("");

  const [id_cliente, setId_cliente] = useState("");
  const [id_clienteError, setId_clienteError] = useState("");

  const [status, setStatus] = useState("");

  const [statusError, setStatusError] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [erroAoAtualizar, setErroAoAtualizar] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const camposAtualizados = {};
    if (id_pedido !== "") {
      camposAtualizados.id_pedido = id_pedido;
    }
    if (id_funcionario !== "") {
      camposAtualizados.id_funcionario = id_funcionario;
    }
    if (id_cliente !== "") {
      camposAtualizados.id_cliente = id_cliente;
    }
    if (status !== "") {
      camposAtualizados.status = status;
    }

    fetch(`http://localhost:6050/pedidos/update/${id_pedido}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(camposAtualizados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        if (response.status === 200) {
          console.log("Registro atualizado com sucesso!");
          setId_funcionario(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErroAoAtualizar(true);
        setModalAberto(true);
      });
  };

  const handleId_pedidoChange = (event) => {
    setId_pedido(event.target.value);
  };

  const handleId_funcionarioChange = (event) => {
    setId_funcionario(event.target.value);
  };

  const handleId_clienteChange = (event) => {
    setId_cliente(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Pedidos</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={id_pedidoError ? styles.label_error : ""}>
                ID Pedido *
              </label>
              <input
                type="text"
                name="id_pedido"
                style={{ borderColor: id_pedidoError ? "red" : "" }}
                placeholder="Digite o Id Pedido..."
                value={id_pedido}
                onChange={handleId_pedidoChange}
              />
              {id_pedidoError && (
                <span className={styles.error_mensagem}>{id_pedidoError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={id_funcionarioError ? styles.label_error : ""}>
                ID Funcionário *
              </label>
              <input
                type="text"
                name="id_funcionario"
                style={{ borderColor: id_funcionarioError ? "red" : "" }}
                placeholder="Digite o Id Funcionário..."
                value={id_funcionario}
                onChange={handleId_funcionarioChange}
              />
              {id_funcionarioError && (
                <span className={styles.error_mensagem}>
                  {id_funcionarioError}
                </span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={id_clienteError ? styles.label_error : ""}>
                ID Cliente *
              </label>
              <input
                type="text"
                name="id_cliente"
                style={{ borderColor: id_clienteError ? "red" : "" }}
                placeholder="Digite o Id Cliente..."
                value={id_cliente}
                onChange={handleId_clienteChange}
              />
              {id_clienteError && (
                <span className={styles.error_mensagem}>{id_clienteError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={statusError ? styles.label_error : ""}>
                Status *
              </label>
              <input
                type="text"
                name="status"
                style={{ borderColor: statusError ? "red" : "" }}
                placeholder="Digite o seu status..."
                value={status}
                onChange={handleStatusChange}
              />
              {statusError && (
                <span className={styles.error_mensagem}>{statusError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {modalAberto && (
        <Modal
          mensagem="Pedido cadastrado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/pedidos"
        />
      )}
    </div>
  );
}

export default AtualizarPedidos;
