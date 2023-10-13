import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function CadastrarPedidoContas() {
  const [id_pedido, setIdPedido] = useState("");
  const [id_conta, setIdConta] = useState("");

  const [idPedidoError, setIdPedidoError] = useState("");
  const [idContaError, setIdContaError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const validarFormulario = () => {
    if (
      idPedidoError === "" &&
      id_pedido !== "" &&
      idContaError === "" &&
      id_conta !== ""
    ) {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (id_pedido === "") {
      setIdPedidoError("Preencha o ID do Pedido");
    }

    if (id_conta === "") {
      setIdContaError("Preencha o ID da Conta");
    }

    const dadosPedidoContas = {
      id_pedido: id_pedido,
      id_conta: id_conta,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(dadosPedidoContas),
    };

    console.log(dadosPedidoContas);

    fetch("http://localhost:6050/pedidos_contas/insert", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }

        if (response.status === 200) {
          console.log("Conta cadastrado com sucesso!");
          setCadastroConcluido(true);
          setModalAberto(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleIdPedidoChange = (event) => {
    setIdPedido(event.target.value);
  };

  const handleIdContaChange = (event) => {
    setIdConta(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Cadastro de Pedido e Conta</h1>

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
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {modalAberto && (
        <Modal
          mensagem="Pedido e Conta cadastrado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/pedidoConta"
        />
      )}
    </div>
  );
}

export default CadastrarPedidoContas;
