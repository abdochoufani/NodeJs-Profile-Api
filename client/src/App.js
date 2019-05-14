import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" render={() => { return <Login /> }} />
        <Route path="/register" render={() => { return <Register /> }} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
