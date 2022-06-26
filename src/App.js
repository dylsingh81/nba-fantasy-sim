import Home from './components/Home/Home';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Roster  from './components/Roster/Roster';
import TeamBuilder from './components/TeamBuilder/TeamBuilder';
import Simulator from './components/Simulator/Simulator';

function App() {
  return (
    <div className="App">
        <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/team" element={<TeamBuilder />} />
          <Route path="/simulator" element={<Simulator />} />


        </Routes>
        </Router>
    </div>
  );
}

export default App;
