import { useState, useEffect } from "react";

import MensagemCadastro from "../layout/MensagemCadastro";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Carregamento from "../layout/Carregamento";
import styles from "./FiltrarFuncionario.module.css";

function CadastrarFuncionario() {
  const [nome, setNome] = useState("");

  const [nomeError, setNomeError] = useState("");

  const [cpf, setCpf] = useState("");

  const [cpfError, setCpfError] = useState("");

  const [ativo, setAtivo] = useState("");

  const [ativoError, setAtivoError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);

  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  const token =
    "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwia…3Mjl9.IV4x31tjU2LJjTQdVp_bpYJjGgLErJOU2_0-C0ySX3Y'}";

  // Função para formatar o CPF com máscara
  const formatCPF = (value) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, "");

    // Aplica a máscara com os pontos após os três primeiros números
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

  useEffect(() => {
    validarFormulario();
  }, [nome, cpf, ativo, ativoError, nomeError, cpfError]);

  // Validação Nome
  const validar_nome = (valor) => {
    if (valor.match(/\d/)) {
      setNomeError("O campo nome não pode ter números");
    } else {
      setNomeError("");
    }
  };

  const validarFormulario = () => {
    if (
      nomeError === "" &&
      nome !== "" &&
      ativoError === "" &&
      ativo !== "" &&
      cpfError === "" &&
      cpf !== "" &&
      cpf.length >= 14
    ) {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    // Validação Nome
    if (nome === "") {
      setNomeError("Preencha o nome");
    } else {
      validar_nome(nome);
    }

    if (ativo === "") {
      setAtivoError("Selecione o status");
    } else {
      setAtivoError("");
    }

    // Validação CPF
    if (cpf === "") {
      setCpfError("Preencha a cpf");
    } else if (cpf.length !== 14) {
      setCpfError("Cpf precisa ter no minimo 11 caracteres");
    } else {
      setCpfError("");
    }

    fetch("http://localhost:6050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: "fernandojr",
        pwd: "0410",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
      });
  };

  const handleCloseMensagemSucesso = () => {
    setCadastroConcluido(false);
  };

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleAtivoChange = (event) => {
    // Atualiza o estado com o valor selecionado no <select>
    setAtivo(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>CADASTRO DE FUNCIONÁRIO</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
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
              <label className={cpfError ? styles.label_error : ""}>
                Status *
              </label>
              <select
                name="ativo"
                style={{ borderColor: cpfError ? "red" : "" }}
                value={ativo}
                onChange={handleAtivoChange}
              >
                <option value="" disabled hidden>
                  Selecione o status
                </option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
              {cpfError && (
                <span className={styles.error_mensagem}>{cpfError}</span>
              )}
            </div>

            {cadastroConcluido && (
              <MensagemCadastro
                mensagem="Funcionário cadastrado com sucesso!"
                onClose={handleCloseMensagemSucesso}
              />
            )}

            {/* {emailDuplicado && (
              <MensagemCadastro
                mensagem="O e-mail já está cadastrado. Por favor escolha outro e-mail"
                onClose={handleCloseEmailDuplicado}
              />
            )}  */}

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarFuncionario;
