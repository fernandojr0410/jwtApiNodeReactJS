import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Header from "./componentes/layout/Header";
import Home from "./componentes/pages/Home";
import Funcionarios from "./componentes/pages/Funcionarios";
import Clientes from "./componentes/pages/Clientes";
import Pedidos from "./componentes/pages/Pedidos";
import Contas from "./componentes/pages/Contas";
import Relatorios from "./componentes/pages/Relatorios";
import LoginFuncionario from "./componentes/form//funcionarios/LoginFuncionario";
import FiltrarFuncionarios from "./componentes/form//funcionarios/FiltrarFuncionarios";
import FiltrarFuncionariosId from "./componentes/form//funcionarios/FiltrarFuncionariosId";
import CadastrarFuncionarios from "./componentes/form/funcionarios/CadastrarFuncionarios";
import AtualizarFuncionarios from "./componentes/form/funcionarios/AtualizarFuncionarios";
import DeletarFuncionariosId from "./componentes/form//funcionarios/DeletarFuncionariosId";
import ModalFuncionarios from "./componentes/layout/ModalFuncionarios";

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
          path="/filtrarFuncionariosId"
          element={<FiltrarFuncionariosId token={token} />}
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
          path="/modalFuncionarios"
          element={<ModalFuncionarios token={token} />}
        />
        <Route exact path="/clientes" element={<Clientes token={token} />} />
        <Route exact path="/pedidos" element={<Pedidos token={token} />} />
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
