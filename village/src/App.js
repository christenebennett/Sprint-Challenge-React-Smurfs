import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount(){
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({ smurfs: response.data }))
      .catch(error => console.log(error))
  }
  
  updateSmurfList = (newSmurfs) => {
    this.setState({ smurfs: newSmurfs})
  }

  render() {
    return (
      <div className="App">
        <div className="nav-links">
          <NavLink exact activeClassName="activeNav" className="nav-link" to="/">Home</NavLink>
          <NavLink activeClassName="activeNav" className="nav-link" to="/smurf-form">Add Smurf</NavLink>
        </div>
        {/* <Route path="/smurf-form" component={ SmurfForm } /> */}
        <Route exact path="/smurf-form" render={ props => 
          <SmurfForm 
            {...props} 
            updateSmurfList={ this.updateSmurfList }
          /> } 
        />
        <Route exact path="/" render={ props => 
          <Smurfs 
            {...props} 
            smurfs={ this.state.smurfs }
          /> } 
        />
      </div>
    );
  }
}

export default App;
