import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaPedidoContas({ pedidoContas }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>
        Lista de Pedidos e Contas
      </h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              ID do Pedido
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              ID da Conta
            </th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {pedidoContas && pedidoContas.dados ? (
            pedidoContas.dados.map((pedidoConta) => (
              <tr key={pedidoConta.id_pedido}>
                <td className={styles.tabela_funcionarios_informacao}>
                  {pedidoConta.id_pedido}
                </td>
                <td className={styles.tabela_funcionarios_informacao}>
                  {pedidoConta.id_conta}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className={styles.tabela_funcionarios_mensagem}>
                Nenhum pedido ou conta encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPedidoContas;
