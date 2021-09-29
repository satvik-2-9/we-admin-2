import React from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import './App.css';
import Adminpanel from './Adminpanel';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/">
          <Header></Header>
        </Route>
        <Route path="/login">
          <Header></Header>
          <Login></Login>
        </Route>
        <Route path="/adminpanel">
          <Header />
          <Adminpanel></Adminpanel>
        </Route>
      </Router>
      
    </div>
  );
}

export default App;
