import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Menus from './views/menu';
import Title1 from './views/pages/title-1';
import Title2 from './views/pages/title-2';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Menus />
        
        <Routes>
          <Route path='/' element={<Menus />} />

          <Route path='/pages/page-1' element={<Title1 />} />
          <Route path='/pages/page-2' element={<Title2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
