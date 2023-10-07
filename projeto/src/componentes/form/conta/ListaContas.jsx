import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaContas({ contas }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>Lista de Contas</h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              id_conta
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              status
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              quantidade_pessoa
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              total_conta
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              valor_individual
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              pagamento
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              observacao
            </th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {contas ? (
            contas.dados?.map((conta) => {
              return (
                <tr key={conta.id_conta}>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.id_conta}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.status}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.quantidade_pessoa}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.total_conta}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.valor_individual}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.pagamento}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {conta.observacao}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className={styles.tabela_funcionarios_mensagem}>
                Nenhuma conta encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaContas;
