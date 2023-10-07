import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaFuncionarios({ pedidos }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>Lista de Pedidos</h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              Id_Pedido
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              Id_Funcionario
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              Id_Cliente
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              Status
            </th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {pedidos ? (
            pedidos.dados?.map((pedido) => {
              return (
                <tr key={pedido.id_pedido}>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {pedido.id_pedido}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {pedido.id_funcionario}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {pedido.id_cliente}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {pedido.status}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className={styles.tabela_funcionarios_mensagem}>
                Nenhum pedido encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFuncionarios;
