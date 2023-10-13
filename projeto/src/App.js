import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Header from "./componentes/layout/Header";
import Home from "./componentes/pages/Home";
import Funcionarios from "./componentes/pages/Funcionarios";
import Clientes from "./componentes/pages/Clientes";
import Produtos from "./componentes/pages/Produtos";
import Contas from "./componentes/pages/Contas";
import PedidoConta from "./componentes/pages/PedidoConta";
import Relatorios from "./componentes/pages/Relatorios";

import LoginFuncionario from "./componentes/form//funcionarios/LoginFuncionario";
import FiltrarFuncionarios from "./componentes/form//funcionarios/FiltrarFuncionarios";
import CadastrarFuncionarios from "./componentes/form/funcionarios/CadastrarFuncionarios";
import AtualizarFuncionarios from "./componentes/form/funcionarios/AtualizarFuncionarios";
import DeletarFuncionariosId from "./componentes/form//funcionarios/DeletarFuncionariosId";
import ListaFuncionarios from "./componentes/form/funcionarios/ListaFuncionarios";

import FiltrarCliente from "./componentes/form/cliente/FiltrarCliente";
import CadastrarCliente from "./componentes/form/cliente/CadastrarCliente";
import AtualizarClientes from "./componentes/form/cliente/AtualizarClientes";
import DeletarClientesId from "./componentes/form/cliente/DeletarClientesId";
import ListaClientes from "./componentes/form/cliente/ListaClientes";

import FiltrarProdutos from "./componentes/form/produtos/FiltrarProdutos";
import CadastrarProdutos from "./componentes/form/produtos/CadastrarProdutos";
import AtualizarProdutos from "./componentes/form/produtos/AtualizarProdutos";
import DeletarProdutosId from "./componentes/form/produtos/DeletarProdutosId";
import ListaProdutos from "./componentes/form/produtos/ListaProdutos";

import Pedidos from "./componentes/pages/Pedidos";
import FiltrarPedidos from "./componentes/form/pedidos/FiltrarPedidos";
import CadastrarPedidos from "./componentes/form/pedidos/CadastrarPedidos";
import AtualizarPedidos from "./componentes/form/pedidos/AtualizarPedidos";
import DeletarPedidosId from "./componentes/form/pedidos/DeletarPedidosId";
import ListaPedidos from "./componentes/form/pedidos/ListaPedidos";

import FiltrarContas from "./componentes/form/conta/FiltrarContas";
import ListaContas from "./componentes/form/conta/ListaContas";
import CadastrarContas from "./componentes/form/conta/CadastrarContas";
import AtualizarContas from "./componentes/form/conta/AtualizarContas";
import DeletarContasId from "./componentes/form/conta/DeletarContasId";
import FiltrarPedidoContas from "./componentes/form/pedidoContas/FiltrarPedidoContas";
import ListaPedidoContas from "./componentes/form/pedidoContas/ListaPedidoContas";
import CadastrarPedidoContas from "./componentes/form/pedidoContas/CadastrarPedidoContas";
import AtualizarPedidoContas from "./componentes/form/pedidoContas/AtualizarPedidoContas";
import DeletarPedidoContas from "./componentes/form/pedidoContas/DeletarPedidoContas";
import ItemPedido from "./componentes/pages/ItemPedido";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/home" element={<Home token={token} />} />
        <Route
          exact
          path="/funcionarios"
          element={<Funcionarios token={token} />}
        />
        <Route
          exact
          path="/loginFuncionario"
          element={<LoginFuncionario setToken={setToken} />}
        />
        <Route
          exact
          path="/filtrarFuncionarios"
          element={<FiltrarFuncionarios token={token} />}
        />
        <Route
          exact
          path="/cadastrarFuncionarios"
          element={<CadastrarFuncionarios token={token} />}
        />
        <Route
          exact
          path="/atualizarFuncionarios"
          element={<AtualizarFuncionarios token={token} />}
        />
        <Route
          exact
          path="/deletarFuncionariosId"
          element={<DeletarFuncionariosId token={token} />}
        />
        <Route
          exact
          path="/listaFuncionarios"
          element={<ListaFuncionarios />}
        />
        <Route exact path="/clientes" element={<Clientes token={token} />} />
        <Route
          exact
          path="/filtrarCliente"
          element={<FiltrarCliente token={token} />}
        />
        <Route
          exact
          path="/cadastrarCliente"
          element={<CadastrarCliente token={token} />}
        />
        <Route
          exact
          path="/atualizarClientes"
          element={<AtualizarClientes token={token} />}
        />
        <Route
          exact
          path="/deletarClientesId"
          element={<DeletarClientesId token={token} />}
        />
        <Route exact path="/listaClientes" element={<ListaClientes />} />

        <Route exact path="/produtos" element={<Produtos token={token} />} />
        <Route
          exact
          path="/filtrarProdutos"
          element={<FiltrarProdutos token={token} />}
        />
        <Route
          exact
          path="/cadastrarProdutos"
          element={<CadastrarProdutos token={token} />}
        />

        <Route
          exact
          path="/atualizarProdutos"
          element={<AtualizarProdutos token={token} />}
        />

        <Route
          exact
          path="/deletarProdutosId"
          element={<DeletarProdutosId token={token} />}
        />

        <Route
          exact
          path="/listaProdutos"
          element={<ListaProdutos token={token} />}
        />

        <Route exact path="/pedidos" element={<Pedidos token={token} />} />

        <Route
          exact
          path="/filtrarPedidos"
          element={<FiltrarPedidos token={token} />}
        />

        <Route
          exact
          path="/listaPedidos"
          element={<ListaPedidos token={token} />}
        />

        <Route
          exact
          path="/cadastrarPedidos"
          element={<CadastrarPedidos token={token} />}
        />

        <Route
          exact
          path="/atualizarPedidos"
          element={<AtualizarPedidos token={token} />}
        />

        <Route
          exact
          path="/deletarPedidosId"
          element={<DeletarPedidosId token={token} />}
        />

        <Route exact path="/contas" element={<Contas token={token} />} />

        <Route
          exact
          path="/filtrarContas"
          element={<FiltrarContas token={token} />}
        />

        <Route
          exact
          path="/listaContas"
          element={<ListaContas token={token} />}
        />

        <Route
          exact
          path="/cadastrarContas"
          element={<CadastrarContas token={token} />}
        />

        <Route
          exact
          path="/atualizarContas"
          element={<AtualizarContas token={token} />}
        />
        <Route
          exact
          path="/deletarContasId"
          element={<DeletarContasId token={token} />}
        />
        <Route
          exact
          path="/pedidoConta"
          element={<PedidoConta token={token} />}
        />
        <Route
          exact
          path="/filtrarPedidoContas"
          element={<FiltrarPedidoContas token={token} />}
        />

        <Route
          exact
          path="/listaPedidoContas"
          element={<ListaPedidoContas token={token} />}
        />

        <Route
          exact
          path="/cadastrarPedidoContas"
          element={<CadastrarPedidoContas token={token} />}
        />

        <Route
          exact
          path="/atualizarPedidoContas"
          element={<AtualizarPedidoContas token={token} />}
        />

        <Route
          exact
          path="/deletarPedidoContas"
          element={<DeletarPedidoContas token={token} />}
        />

        <Route
          exact
          path="/itemPedido"
          element={<ItemPedido token={token} />}
        />

        <Route
          exact
          path="/relatorios"
          element={<Relatorios token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
