import { useState } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarClientes() {
  const [nome, setNome] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idClienteError, setIdClienteError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [ativoError, setAtivoError] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [cliente, setCliente] = useState([]);
  const [erroAoAtualizar, setErroAoAtualizar] = useState(false);

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

    if (idCliente === "") {
      setIdClienteError("Insira o ID do Cliente");
    } else {
      setIdClienteError("");
    }

    const camposAtualizados = {};
    if (idCliente !== "") {
      camposAtualizados.idCliente = idCliente;
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

    fetch(`http://localhost:6050/clientes/update/${idCliente}`, {
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
          setCliente(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErroAoAtualizar(true);
        setModalAberto(true);
      });
  };

  const handleCpfChange = (event) => {
    const formattedCpf = formatCPF(event.target.value);
    setCpf(formattedCpf);
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
  };

  const handleIdClienteChange = (event) => {
    setIdCliente(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Clientes</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idClienteError ? styles.label_error : ""}>
                ID Cliente *
              </label>
              <input
                type="text"
                name="idCliente"
                style={{ borderColor: idClienteError ? "red" : "" }}
                placeholder="Digite o Id Cliente..."
                value={idCliente}
                onChange={handleIdClienteChange}
              />
              {idClienteError && (
                <span className={styles.error_mensagem}>{idClienteError}</span>
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
                <button type="submit">Atualizar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {modalAberto && (
        <Modal
          mensagem="Cliente atualizado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/clientes"
        />
      )}

      {erroAoAtualizar && (
        <Modal
          mensagem="Erro ao atualizar cliente. Tente novamente."
          onClose={() => setErroAoAtualizar(false)}
        />
      )}
    </div>
  );
}

export default AtualizarClientes;
