import Start from './pages/StartPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
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
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
