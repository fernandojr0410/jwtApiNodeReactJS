import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import MensagemCadastro from "../layout/MenssagemCadastro";
import Carregamento from "../layout/Carregamento";
import styles from "./LoginFuncionario.module.css";

function LoginFuncionario() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const [abrirModal, setAbrirModal] = useState(false);
  const [menssagemModal, setMenssagemModal] = useState("");

  // const navigate = useNavigate();

  const [carregamento, setCarregamento] = useState(false);

  // Validação E-mail
  const validarEmail = (valor) => {
    const emails_permitidos = [
      "gmail.com",
      "gmail.com.br",
      "hotmail.com",
      "hotmail.com.br",
      "outlook.com",
      "outlook.com.br",
      "yahoo.com",
      "yahoo.com.br",
    ];

    const email = valor.split("@");
    if (email.length !== 2 || !emails_permitidos.includes(email[1])) {
      setEmailError("E-mail inválido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    // Validação E-mail
    if (email === "") {
      setEmailError("Preencha o e-mail");
    } else {
      validarEmail(email);
    }

    // Validação Senha
    if (senha === "") {
      setSenhaError("Preencha a senha");
    } else {
      setSenhaError("");
    }

    if (
      emailError === "" &&
      senhaError === "" &&
      email !== "" &&
      senha !== ""
    ) {
      setCarregamento(true);

      try {
        const response = await fetch(
          `http://localhost:5000/cadastro_cliente?email=${email}&senha=${senha}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          if (data.length > 0) {
            setEmail("");
            setSenha("");
            // navigate("/home");
          } else {
            setMenssagemModal("Conta não encontrada");
            setAbrirModal(true);
          }
        } else if (response.status === 401) {
          setMenssagemModal("Conta não encontrada");
          setAbrirModal(true);
          throw new Error("Falha na autenticação");
        } else {
          console.error("Erro desconhecido no servidor");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setCarregamento(false);
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.formulario_container}>
      <div className={styles.titulo_formulario}>
        <h1>LOGIN</h1>
        {!carregamento ? (
          <div className={styles.card_formulario_container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.informacoes_formulario}>
                <label className={emailError ? styles.label_error : ""}>
                  E-mail *
                </label>
                <input
                  type="text"
                  name="email"
                  style={{ borderColor: emailError ? "red" : "" }}
                  placeholder="Digite o seu email..."
                  value={email}
                  onChange={(evento) => {
                    setEmail(evento.target.value);
                    validarEmail(evento.target.value);
                  }}
                />
                {emailError && (
                  <span className={styles.error_mensagem}>{emailError}</span>
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

              <div className={styles.conta_formulario}>
                <span>Ainda não tem conta?</span>
                <div className={styles.conta}>
                  <Link to="/matricula">
                    <button>Cadastre-se</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <Carregamento />
        )}
      </div>

      {/* {abrirModal && !carregamento && (
        <MensagemCadastro
          mensagem={menssagemModal}
          onClose={() => setAbrirModal(false)}
        />
      )} */}
    </div>
  );
}

export default LoginFuncionario;
