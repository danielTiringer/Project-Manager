import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import AdminPage from './Pages/AdminPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import './main.css';
import UserContext from './Context/UserContext';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <UserContext>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/admin" component={AdminPage}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/profile" component={Profile}></Route>
        </Switch>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
