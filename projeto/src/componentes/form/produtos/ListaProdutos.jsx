import React from "react";
import styles from "../../styles/ListaFuncionarios.module.css";

function ListaProdutos({ produtos }) {
  return (
    <div className={styles.lista_funcionario_container}>
      <h2 className={styles.lista_funcionario_titulo}>Lista de Produtos</h2>

      <table className={styles.tabela_funcionarios_container}>
        <thead className={styles.tabela_funcionarios_cabecalho}>
          <tr>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Id</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Nome</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>preco</th>
            <th className={styles.tabela_funcionarios_cabecalho_item}>Ativo</th>
          </tr>
        </thead>
        <tbody className={styles.tabela_funcionarios_linha}>
          {produtos ? (
            produtos.dados?.map((produto) => {
              return (
                <tr key={produto.id_produto}>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {produto.id_produto}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {produto.nome}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {produto.preco}
                  </td>
                  <td className={styles.tabela_funcionarios_informacao}>
                    {produto.ativo ? "Ativo" : "Inativo"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className={styles.tabela_funcionarios_mensagem}>
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProdutos;
