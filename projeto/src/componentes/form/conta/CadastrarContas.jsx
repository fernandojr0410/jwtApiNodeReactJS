import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function CadastrarContas() {
  const [status, setStatus] = useState("");
  const [quantidadePessoa, setQuantidadePessoa] = useState("");
  const [totalConta, setTotalConta] = useState("");
  const [valorIndividual, setValorIndividual] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [quantidadePessoaError, setQuantidadePessoaError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [totalContaError, setTotalContaError] = useState("");
  const [valorIndividualError, setValorIndividualError] = useState("");
  const [pagamentoError, setPagamentoError] = useState("");
  const [observacaoError, setObservacaoError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  const validarFormulario = () => {
    if (
      statusError === "" &&
      status !== "" &&
      quantidadePessoaError === "" &&
      quantidadePessoa !== "" &&
      totalContaError === "" &&
      totalConta !== "" &&
      valorIndividualError === "" &&
      valorIndividual !== "" &&
      pagamentoError !== "" &&
      pagamento !== "" &&
      observacaoError !== "" &&
      observacao !== ""
    ) {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (status === "") {
      setStatusError("Preencha o status");
    }
    if (quantidadePessoa === "") {
      setQuantidadePessoaError("Preencha a quantidade de pessoas");
    } else if (quantidadePessoa > 4) {
      setQuantidadePessoa("Só pode dividir no máximo 4 pessoas");
    }

    if (totalConta === "") {
      setTotalContaError("Preencha o total de conta");
    }

    if (valorIndividual === "") {
      setValorIndividual("Preencha o valor individual");
    }

    if (pagamento === "") {
      setPagamento("Preencha o pagamento");
    }

    if (observacao === "") {
      setObservacaoError("Preencha a observação");
    }

    const statusNumerico = status === "1" ? 1 : 0;

    const dadosContas = {
      status: statusNumerico,
      quantidadePessoa: quantidadePessoa,
      totalConta: totalConta,
      valorIndividual: valorIndividual,
      pagamento: pagamento,
      observacao: observacao,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(dadosContas),
    };

    console.log(dadosContas);

    fetch("http://localhost:6050/contas/insert", requestOptions)
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
        <h1>Cadastro de Contas</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={statusError ? styles.label_error : ""}>
                Status *
              </label>
              <select
                name="status"
                style={{ borderColor: statusError ? "red" : "" }}
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Selecione o status</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
              {statusError && (
                <span className={styles.error_mensagem}>{statusError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label
                className={quantidadePessoaError ? styles.label_error : ""}
              >
                Quantidade de Pessoas *
              </label>
              <input
                type="number"
                name="quantidadePessoa"
                style={{ borderColor: quantidadePessoaError ? "red" : "" }}
                placeholder="Digite a quantidade de pessoas..."
                value={quantidadePessoa}
                onChange={handleQuantidadePessoaChange}
              />
              {quantidadePessoaError && (
                <span className={styles.error_mensagem}>
                  {quantidadePessoaError}
                </span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={totalContaError ? styles.label_error : ""}>
                Total Conta *
              </label>
              <input
                type="text"
                name="totalConta"
                style={{ borderColor: totalContaError ? "red" : "" }}
                placeholder="Digite o total da conta..."
                value={totalConta}
                onChange={handleTotalContaChange}
              />
              {totalContaError && (
                <span className={styles.error_mensagem}>{totalContaError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={valorIndividualError ? styles.label_error : ""}>
                Valor Individual *
              </label>
              <input
                type="text"
                name="valorIndividual"
                style={{ borderColor: valorIndividualError ? "red" : "" }}
                placeholder="Digite o valor individual..."
                value={valorIndividual}
                onChange={handleValorIndividual}
              />
              {valorIndividualError && (
                <span className={styles.error_mensagem}>
                  {valorIndividualError}
                </span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={pagamentoError ? styles.label_error : ""}>
                Pagamento *
              </label>
              <input
                type="text"
                name="pagamento"
                style={{ borderColor: pagamentoError ? "red" : "" }}
                placeholder="Digite o pagamento..."
                value={pagamento}
                onChange={handlePagamentoChange}
              />
              {pagamentoError && (
                <span className={styles.error_mensagem}>{pagamentoError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={observacaoError ? styles.label_error : ""}>
                Observação *
              </label>
              <input
                type="text"
                name="observacao"
                style={{ borderColor: observacaoError ? "red" : "" }}
                placeholder="Digite a observação..."
                value={observacao}
                onChange={handleObservacaoChange}
              />
              {observacaoError && (
                <span className={styles.error_mensagem}>{observacaoError}</span>
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
          mensagem="Conta cadastrado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/contas"
        />
      )}
    </div>
  );
}

export default CadastrarContas;
