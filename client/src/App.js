import Start from './StartPage';
import Home from './comps/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return(
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<Start />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
