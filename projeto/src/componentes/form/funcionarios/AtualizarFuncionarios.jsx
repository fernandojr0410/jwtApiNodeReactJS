import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarFuncionarios() {
  const [nome, setNome] = useState("");

  const [idFuncionario, setIdFuncionario] = useState("");

  const [idFuncionarioError, setIdFuncionarioError] = useState("");

  const [nomeError, setNomeError] = useState("");

  const [cpf, setCpf] = useState("");

  const [cpfError, setCpfError] = useState("");

  const [ativo, setAtivo] = useState(false);

  const [ativoError, setAtivoError] = useState("");

  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  // Formatar o CPF com máscara
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    // máscara com os pontos após os três primeiros números
    let formattedValue = "";
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === 3 || i === 6) {
        formattedValue += ".";
      }
      if (i === 9) {
        formattedValue += "-";
      }
      formattedValue += cleanedValue.charAt(i);
    }

    return formattedValue;
  };

  // Validação Nome
  const validar_nome = (valor) => {
    if (valor.match(/\d/)) {
      setNomeError("O campo nome não pode ter números");
    } else {
      setNomeError("");
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (idFuncionario === "") {
      setIdFuncionarioError("Insira o ID do Funcionário");
    } else {
      setIdFuncionarioError("");
    }

    const camposAtualizados = {};
    if (idFuncionario !== "") {
      camposAtualizados.idFuncionario = idFuncionario;
    }
    if (nome !== "") {
      camposAtualizados.nome = nome;
    }
    if (cpf !== "") {
      camposAtualizados.cpf = cpf;
    }
    if (ativo !== "") {
      camposAtualizados.ativo = ativo;
    }

    console.log("ID Funcionário antes da requisição:", idFuncionario);
    console.log("Nome Funcionário antes da requisição:", nome);
    console.log("cpf Funcionário antes da requisição:", cpf);
    console.log("ativo Funcionário antes da requisição:", ativo);

    fetch(`http://localhost:6050/funcionarios/update/${idFuncionario}`, {
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
        }
      })
      .catch((error) => console.error(error));
  };

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
  };

  const handleIdFuncionarioChange = (event) => {
    setIdFuncionario(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Funcionários</h1>

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
              <label className={nomeError ? styles.label_error : ""}>
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                style={{ borderColor: nomeError ? "red" : "" }}
                placeholder="Digite o seu nome..."
                value={nome}
                onChange={(evento) => {
                  setNome(evento.target.value);
                  validar_nome(evento.target.value);
                }}
              />
              {nomeError && (
                <span className={styles.error_mensagem}>{nomeError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={cpfError ? styles.label_error : ""}>
                CPF *
              </label>
              <input
                type="text"
                name="cpf"
                style={{ borderColor: cpfError ? "red" : "" }}
                placeholder="Digite seu CPF..."
                value={cpf}
                onChange={handleCpfChange}
              />
              {cpfError && (
                <span className={styles.error_mensagem}>{cpfError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <label className={ativoError ? styles.label_error : ""}>
                Status *
              </label>
              <select
                name="ativo"
                style={{ borderColor: ativoError ? "red" : "" }}
                value={ativo}
                onChange={handleAtivoChange}
              >
                <option value="">Selecione o novo status</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
              {ativoError && (
                <span className={styles.error_mensagem}>{ativoError}</span>
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
          mensagem="Funcionário atualizado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/funcionarios"
        />
      )}
    </div>
  );
}

export default AtualizarFuncionarios;
