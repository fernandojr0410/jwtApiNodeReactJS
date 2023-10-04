import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./componentes/layout/Header";
import Home from "./componentes/pages/Home";
import Funcionarios from "./componentes/pages/Funcionarios";
import Clientes from "./componentes/pages/Clientes";
import Pedidos from "./componentes/pages/Pedidos";
import Contas from "./componentes/pages/Contas";
import Relatorios from "./componentes/pages/Relatorios";
import FiltrarFuncionario from "./componentes/form/FiltrarFuncionario";
import CadastrarFuncionario from "./componentes/form/CadastrarFuncionario";
import LoginFuncionario from "./componentes/form/LoginFuncionario";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/funcionarios" element={<Funcionarios />} />
        <Route exact path="/loginFuncionario" element={<LoginFuncionario />} />
        <Route
          exact
          path="/filtrarFuncionario"
          element={<FiltrarFuncionario />}
        />
        <Route
          exact
          path="/cadastrarFuncionario"
          element={<CadastrarFuncionario />}
        />
        <Route exact path="/clientes" element={<Clientes />} />
        <Route exact path="/pedidos" element={<Pedidos />} />
        <Route exact path="/contas" element={<Contas />} />
        <Route exact path="/relatorios" element={<Relatorios />} />
      </Routes>
    </Router>
  );
}

export default App;
