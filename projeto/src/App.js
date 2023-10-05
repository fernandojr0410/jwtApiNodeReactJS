import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Header from "./componentes/layout/Header";
import Home from "./componentes/pages/Home";
import Funcionarios from "./componentes/pages/Funcionarios";
import Clientes from "./componentes/pages/Clientes";
import Pedidos from "./componentes/pages/Pedidos";
import Contas from "./componentes/pages/Contas";
import Relatorios from "./componentes/pages/Relatorios";
import FiltrarFuncionarios from "./componentes/form/FiltrarFuncionarios";
import FiltrarFuncionariosId from "./componentes/form/FiltrarFuncionariosId";
import CadastrarFuncionario from "./componentes/form/CadastrarFuncionario";
import LoginFuncionario from "./componentes/form/LoginFuncionario";

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
          path="/cadastrarFuncionario"
          element={<CadastrarFuncionario token={token} />}
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
