import { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import styles from "../styles/FiltrarFuncionario.module.css";

function CadastrarFuncionario() {
  const [nome, setNome] = useState("");

  const [nomeError, setNomeError] = useState("");

  const [cpf, setCpf] = useState("");

  const [cpfError, setCpfError] = useState("");

  const [ativo, setAtivo] = useState("");

  const [ativoError, setAtivoError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);

  // const [cadastroConcluido, setCadastroConcluido] = useState(false);
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
  };

  if (formularioValido) {
    const funcionarioData = {
      nome: nome,
      cpf: cpf,
      ativo: ativo,
    };

    

    fetch("http://localhost:6050/funcionarios/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(funcionarioData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar funcionário:", error);
        console.log(token);
      });
  }

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
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
          mensagem="Funcionário cadastrado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/funcionarios"
        />
      )}
    </div>
  );
}

export default CadastrarFuncionario;
