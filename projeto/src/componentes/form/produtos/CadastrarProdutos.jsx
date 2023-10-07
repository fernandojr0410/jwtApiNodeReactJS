import { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function CadastrarProdutos() {
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [preco, setPreco] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [ativoError, setAtivoError] = useState("");
  const [formularioValido, setFormularioValido] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    validarFormulario();
  }, [nome, preco, ativo, ativoError, nomeError, cpfError]);

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
      preco !== "" &&
      preco.length < 0
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

    if (preco === "") {
      setCpfError("Preencha a preco");
    } else if (preco.length <= 0) {
      setCpfError("Valor não é permitido");
    } else {
      setCpfError("");
    }

    const ativoNumerico = ativo === "1" ? 1 : 0;

    const dadosProdutos = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ nome: nome, preco: preco, ativo: ativoNumerico }),
    };

    fetch("http://localhost:6050/produtos/insert", dadosProdutos)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }

        if (response.status === 200) {
          console.log("Produto cadastrado com sucesso!");
          setCadastroConcluido(true);
          setModalAberto(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePrecoChange = (event) => {
    const input = event.target.value;

    if (/^\d{0,5}(\.\d{0,2})?$/.test(input)) {
      setPreco(input);
    }
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Cadastro de Produtos</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={nomeError ? styles.label_error : ""}>
                Produto *
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
                Preço *
              </label>
              <input
                type="text"
                name="preco"
                style={{ borderColor: cpfError ? "red" : "" }}
                placeholder="Digite o preço do produto..."
                value={preco}
                onChange={handlePrecoChange}
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
                <option value="">Selecione o status</option>
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
          mensagem="Produto cadastrado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/produtos"
        />
      )}
    </div>
  );
}

export default CadastrarProdutos;
