import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Auth from './components/auth';
import Profile from './components/profile';
import Inbox from './components/inbox' ;
import {UserProvider} from './userContext'

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <div className = "box">

       <Switch>
          <Route path="/register" > <Auth isRegister = {1} />  </Route>
          <Route path="/login" > <Auth /> </Route>

          <Route path = "/questions"> <Inbox/> </Route>
          <Route path = {"/profile/:username"} component = {Profile}  />
          <Route exact path = "/" > <Home/> </Route>
       </Switch>  
       </div>
    </UserProvider>      
    </BrowserRouter>
  );
}

export default App;
