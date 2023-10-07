import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Header from "./componentes/layout/Header";
import Home from "./componentes/pages/Home";
import Funcionarios from "./componentes/pages/Funcionarios";
import Clientes from "./componentes/pages/Clientes";
import Produtos from "./componentes/pages/Produtos";
import Contas from "./componentes/pages/Contas";
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

import FiltrarProdutos from "./componentes/form/produtos/FiltrarProdutos";
import CadastrarProdutos from "./componentes/form/produtos/CadastrarProdutos";
import ListaClientes from "./componentes/form/cliente/ListaClientes";
import AtualizarProdutos from "./componentes/form/produtos/AtualizarProdutos";
import DeletarProdutosId from "./componentes/form/produtos/DeletarProdutosId";
import ListaProdutos from "./componentes/form/produtos/ListaProdutos";
import Pedidos from "./componentes/pages/Pedidos";
import FiltrarPedidos from "./componentes/form/pedidos/FiltrarPedidos";
import CadastrarPedidos from "./componentes/form/pedidos/CadastrarPedidos";
import AtualizarPedidos from "./componentes/form/pedidos/AtualizarPedidos";
import DeletarPedidosId from "./componentes/form/pedidos/DeletarPedidosId";

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
          path="/listaProdutos"
          element={<ListaProdutos token={token} />}
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
          path="/relatorios"
          element={<Relatorios token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
