import { useState } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function AtualizarProdutos() {
  const [nome, setNome] = useState("");
  const [idProduto, setIdProduto] = useState("");
  const [idFuncionarioError, setIdProdutoError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [preco, setPreco] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [ativoError, setAtivoError] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [erroAoAtualizar, setErroAoAtualizar] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

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

    if (idProduto === "") {
      setIdProdutoError("Insira o ID do Funcionário");
    } else {
      setIdProdutoError("");
    }

    const camposAtualizados = {};
    if (idProduto !== "") {
      camposAtualizados.idProduto = idProduto;
    }
    if (nome !== "") {
      camposAtualizados.nome = nome;
    }
    if (preco !== "") {
      camposAtualizados.preco = preco;
    }
    if (ativo !== "") {
      camposAtualizados.ativo = ativo;
    }

    fetch(`http://localhost:6050/produtos/update/${idProduto}`, {
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
          setFuncionarios(true);
          setModalAberto(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErroAoAtualizar(true);
        setModalAberto(true);
      });
  };

  const handlePrecoChange = (event) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/[^0-9.,]/g, "");

    const formattedValue = cleanedValue.replace(",", ".");

    setPreco(formattedValue);
  };

  const handleIdProdutoChange = (event) => {
    setIdProduto(event.target.value);
  };

  const handleAtivoChange = (event) => {
    setAtivo(event.target.value.toString());
    console.log("Valor do status:", event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Atualizar Produtos</h1>

        <div className={styles.card_formulario_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.informacoes_formulario}>
              <label className={idFuncionarioError ? styles.label_error : ""}>
                ID Produto *
              </label>
              <input
                type="text"
                name="idProduto"
                style={{ borderColor: idFuncionarioError ? "red" : "" }}
                placeholder="Digite o Id Produto..."
                value={idProduto}
                onChange={handleIdProdutoChange}
              />
              {idFuncionarioError && (
                <span className={styles.error_mensagem}>
                  {idFuncionarioError}
                </span>
              )}
            </div>

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
          mensagem="Produto atualizado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/produtos"
        />
      )}

      {erroAoAtualizar && (
        <Modal
          mensagem="Erro ao atualizar produto. Tente novamente."
          onClose={() => setErroAoAtualizar(false)}
        />
      )}
    </div>
  );
}

export default AtualizarProdutos;
