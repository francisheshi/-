import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menus from "./views/menu";
import ButtonComponent from "./views/pages/Button";
import Input from "./views/pages/Input";
import Form from "./views/pages/Form";

import "./App.css";
import Checkbox from "./views/pages/Checkbox";
import Dropdown from "./views/pages/Dropdown";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menus />

        <Routes>
          <Route path="/pages/button" element={<ButtonComponent />} />
          <Route path="/pages/input" element={<Input />} />
          <Route path="/pages/form" element={<Form />} />
          <Route path="/pages/checkbox" element={<Checkbox />} />
          <Route path="/pages/dropdown" element={<Dropdown />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
