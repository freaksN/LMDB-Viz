// suppress irrelevant warnings - (sgvizler unsed)
/* eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import Visualization from './Visualizations/Visualization';
import advancedVisualizations from './Visualizations/advancedVisualizations';

//ADD THE SCRIPT LOCALLY WITH THE BROKEN HREFS FIX
import sgvizler from './scripts/sgvizler-0.6.0/0.6/sgvizler.js'; 

import Home from './Home';
import './App.css';
import {BrowserRouter as Router, Route} from'react-router-dom';
import Nav from './Visualizations/Nav';


// to import query --> import $ from 'jquery'



//other way to import router
//var BrowserRouter = require('react-router-dom');




class App extends Component {
  render() {
    return (
      // <Router>
          <div className="App">
          
          <Visualization />
          
             </div>
     

    );
  }
}

export default App;
