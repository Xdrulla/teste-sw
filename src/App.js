import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import './styles/styles.scss';


const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav className='navbar'>
            <ul>
              <li>
                <Link to="/characters">Personagens</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
            {/* Conteúdo da página inicial */}
        <Route path="/" element={<h1>Clique em "personagens", para começar</h1>} />
            {/* Componente de lista de personagens */}
        <Route path="/characters" element={<CharacterList />} />
            {/* Componente de detalhes do personagem */}       
        <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </div>

    </Router>
  );
};

export default App;


