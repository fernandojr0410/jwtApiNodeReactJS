import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaFuncionarios({ funcionarios }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>Lista de Funcionários</h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Id</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Nome</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>CPF</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Ativo</th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {funcionarios ? (
            funcionarios.dados?.map((funcionario) => {
              return (
                <tr key={funcionario.id_funcionario}>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {funcionario.id_funcionario}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {funcionario.nome}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {funcionario.cpf}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {funcionario.ativo ? "Ativo" : "Inativo"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className={styles.tabela_funcionarios_mensagem}>
                Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFuncionarios;
