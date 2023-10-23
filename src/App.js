import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Frontend from './Frontend';
import './normal.css';
import Gl from './Gl';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Frontend/>}/>
          <Route path="/GLP" exact element={<Gl/>}/>
        </Routes>
    </Router>
  );
}

export default App;
