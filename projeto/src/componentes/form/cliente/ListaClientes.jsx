import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaClientes({ clientes }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>Lista de Clientes</h2>

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
          {clientes ? (
            clientes.dados?.map((cliente) => {
              return (
                <tr key={cliente.id_cliente}>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {cliente.id_cliente}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {cliente.nome}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {cliente.cpf}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className={styles.tabela_funcionarios_mensagem}>
                Nenhum cliente encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;
