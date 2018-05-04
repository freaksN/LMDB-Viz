import React, { Component } from 'react';
import '../App.css';
import { NavLink } from'react-router-dom';


//other way to import router
//var BrowserRouter = require('react-router-dom');



class Nav extends Component {
    render() {
      return (
        <div className='navBar'>
        <ul className='nav'>
        <li><NavLink exact activeClassName='active' to='/'> Home </NavLink>     </li>
        <li><NavLink activeClassName='active' to='/visualizations'> Search and Explore </NavLink>     </li>
        <li><NavLink activeClassName='active' to='/advancedVisualizations'> Quick Views </NavLink> </li>
        </ul>
        </div>
        
        
    
  
      );
    }
  }
  


export default Nav;
