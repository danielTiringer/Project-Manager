import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { userContext } from './Context/UserContext';
import NavBar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import './main.css';
import Register from './Pages/Register';

function App(): JSX.Element {
  const ctx = useContext(userContext);

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        {ctx ? (
          <>
            <Route path="/profile" component={Profile}></Route>
          </>
        ) : (
          <>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
