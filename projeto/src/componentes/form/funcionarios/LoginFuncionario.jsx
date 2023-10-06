import React, { useState, useEffect } from "react";
import Modal from "../../layout/Modal";
import styles from "../../styles/LoginFuncionario.module.css";

function LoginFuncionario() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);

  const [loginInvalido, setLoginInvalido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    validarFormulario();
  }, [nome, senha, nomeError, senhaError]);

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
      senhaError === "" &&
      nome !== "" &&
      senha !== "" &&
      senha.length >= 6
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

    // Validação Senha
    if (senha === "") {
      setSenhaError("Preencha a senha");
    } else {
      setSenhaError("");
    }

    if (nome === "fernandojr" && senha === "0410") {
      setModalAberto(true);
    } else {
      setLoginInvalido(true);
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
        localStorage.setItem("userData", JSON.stringify({ token: data.token }));
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
      });
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>Login</h1>

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
              <label className={senhaError ? styles.label_error : ""}>
                Senha *
              </label>
              <input
                type="password"
                name="password"
                style={{ borderColor: senhaError ? "red" : "" }}
                placeholder="Digite sua senha..."
                value={senha}
                onChange={(evento) => {
                  setSenha(evento.target.value);
                }}
              />
              {senhaError && (
                <span className={styles.error_mensagem}>{senhaError}</span>
              )}
            </div>

            <div className={styles.informacoes_formulario}>
              <div className={styles.button_formulario}>
                <button type="submit">Entrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loginInvalido && (
        <Modal
          mensagem="Login não válido. Verifique o usuário e a senha."
          onClose={() => setLoginInvalido(false)}
        />
      )}

      {modalAberto && (
        <Modal
          mensagem="Login validado com sucesso!"
          onClose={() => setModalAberto(false)}
          link="/funcionarios"
        />
      )}
    </div>
  );
}

export default LoginFuncionario;
