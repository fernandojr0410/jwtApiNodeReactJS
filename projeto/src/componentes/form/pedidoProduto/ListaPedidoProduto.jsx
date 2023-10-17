import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaPedidoProdutos({ pedidoProdutos }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>
        Lista de Pedidos e Produtos
      </h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              ID do Pedido
            </th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>
              ID do Produto
            </th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {pedidoProdutos && pedidoProdutos.dados ? (
            pedidoProdutos.dados.map((pedidoProduto) => (
              <tr key={pedidoProduto.id_pedido}>
                <td className={styles.tabela_funcionarios_informacao}>
                  {pedidoProduto.id_pedido}
                </td>
                <td className={styles.tabela_funcionarios_informacao}>
                  {pedidoProduto.id_produto}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className={styles.tabela_funcionarios_mensagem}>
                Nenhum pedido ou Produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPedidoProdutos;
