import { useState, useEffect } from "react";
import ListaProdutos from "./ListaProdutos";
import Modal from "../../layout/Modal";
import styles from "../../styles/FiltrarFuncionario.module.css";

function FiltrarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [idProduto, setIdProduto] = useState("");
  const [produtoInvalido, setProdutoInvalido] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch("http://localhost:6050/produtos/findAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        setProdutos(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
      });
  }, []);

  const buscarProdutoId = () => {
    if (!idProduto) return;

    fetch(`http://localhost:6050/produtos/findById?id=${idProduto}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação.");
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.dados || data.dados.length === 0) {
          setProdutoInvalido(true);
        } else {
          setProdutoInvalido(false);
          setProdutos(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
      });
  };

  const handleIdProdutoChange = (event) => {
    setIdProduto(event.target.value);
  };

  return (
    <div className={styles.formulario_container}>
      <small className={styles.usuario}>
        <span>Usuário:</span> {produtos?.dadosUsuario?.nome}
      </small>
      <div className={styles.input_funcionario_id}>
        <input
          type="input"
          name="idProduto"
          placeholder="Digite o Id Produto..."
          value={idProduto}
          onChange={handleIdProdutoChange}
        />
        <button type="button" onClick={buscarProdutoId}>
          Buscar
        </button>
      </div>

      {produtoInvalido && (
        <Modal
          mensagem="Produto não encontrado. Tente novamente."
          onClose={() => setProdutoInvalido(false)}
        />
      )}

      <ListaProdutos produtos={produtos} />
    </div>
  );
}

export default FiltrarProdutos;
