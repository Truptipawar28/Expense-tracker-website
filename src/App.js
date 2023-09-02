// import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import LoginPage from './components/LoginPage/LoginPage';
import { useContext } from 'react';
import Home from './components/Page/Home';
import AuthContext from './components/Store/AuthContext';
// import { Route } from 'react-router-dom';

function App() {

 const authCtx = useContext(AuthContext);

  return (
    <div className="App">
       <NavBar />
{authCtx.isLoggedIn && <Home />}
     {!authCtx.isLoggedIn && <LoginPage />}
    </div>
  );
}

export default App;
