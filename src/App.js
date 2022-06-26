import Home from './components/Home/Home';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
