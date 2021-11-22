import Start from './pages/StartPage';
import Posts from './pages/Posts';
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
            <Route 
              path='/home' 
              element={<Posts BEAPI={'/all-posts'} />} 
            />
            <Route 
              path='/profile' 
              element={<Posts BEAPI={'/profile-posts'} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
