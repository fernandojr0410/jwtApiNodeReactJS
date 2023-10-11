import { useState } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarContas() {
  const [id_conta, setIdConta] = useState("");
  const [status, setStatus] = useState("");
  const [quantidadePessoa, setQuantidadePessoa] = useState("");
  const [totalConta, setTotalConta] = useState("");
  const [valorIndividual, setValorIndividual] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [observacao, setObservacao] = useState("");

  const [idContaError, setIdContaError] = useState("");
  const [erroAoAtualizar, setErroAoAtualizar] = useState(false);

  const [formularioValido, setFormularioValido] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const validarFormulario = () => {
    if (idContaError === "" && id_conta !== "") {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (id_conta === "") {
      setIdContaError("Preencha o id da conta");
    } else {
      setIdContaError("");
    }

    const camposAtualizados = {};
    if (id_conta !== "") {
      camposAtualizados.id_conta = id_conta;
    }
    if (status !== "") {
      camposAtualizados.status = status;
    }
    if (totalConta !== "") {
      camposAtualizados.totalConta = totalConta;
    }
    if (valorIndividual !== "") {
      camposAtualizados.valorIndividual = valorIndividual;
    }
    if (pagamento !== "") {
      camposAtualizados.pagamento = pagamento;
    }
    if (observacao !== "") {
      camposAtualizados.observacao = observacao;
    }

    fetch(`http://localhost:6050/contas/update/${id_conta}`, {
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
          console.log("Conta atualizada com sucesso!");
          setIdConta(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErroAoAtualizar(true);
        setModalAberto(true);
      });
  };

  const handleIdContaChange = (event) => {
    setIdConta(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
  };

  const handleQuantidadePessoaChange = (event) => {
    setQuantidadePessoa(event.target.value);
  };

  const handleTotalContaChange = (event) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/[^0-9.,]/g, "");

    const formattedValue = cleanedValue.replace(",", ".");

    setTotalConta(formattedValue);
  };

  const handleValorIndividual = (event) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/[^0-9.,]/g, "");

    const formattedValue = cleanedValue.replace(",", ".");

    setValorIndividual(formattedValue);
  };

  const handlePagamentoChange = (event) => {
    setPagamento(event.target.value);
  };

  const handleObservacaoChange = (event) => {
    setObservacao(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Contas</h1>

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
              <label>Status *</label>
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Selecione o status</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
            </div>

            <div className={styles.informacoes_formulario}>
              <label>Quantidade de Pessoas *</label>
              <input
                type="number"
                name="quantidadePessoa"
                placeholder="Digite a quantidade de pessoas..."
                value={quantidadePessoa}
                onChange={handleQuantidadePessoaChange}
              />
            </div>

            <div className={styles.informacoes_formulario}>
              <label>Total Conta *</label>
              <input
                type="text"
                name="totalConta"
                placeholder="Digite o total da conta..."
                value={totalConta}
                onChange={handleTotalContaChange}
              />
            </div>

            <div className={styles.informacoes_formulario}>
              <label>Valor Individual *</label>
              <input
                type="text"
                name="valorIndividual"
                placeholder="Digite o valor individual..."
                value={valorIndividual}
                onChange={handleValorIndividual}
              />
            </div>

            <div className={styles.informacoes_formulario}>
              <label>Pagamento *</label>
              <input
                type="text"
                name="pagamento"
                placeholder="Digite o pagamento..."
                value={pagamento}
                onChange={handlePagamentoChange}
              />
            </div>

            <div className={styles.informacoes_formulario}>
              <label>Observação *</label>
              <input
                type="text"
                name="observacao"
                placeholder="Digite a observação..."
                value={observacao}
                onChange={handleObservacaoChange}
              />
            </div>

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Atualizar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {modalAberto && (
        <Modal
          mensagem="Conta atualizada com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/contas"
        />
      )}
    </div>
  );
}

export default AtualizarContas;
