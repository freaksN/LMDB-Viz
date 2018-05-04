import React, { Component } from 'react';

// import { Iframe } from 'react-iframe'



 


class Home extends Component {
  render() {
    return (
      
          <div className="Home">
          <h1 className="headerHome">This App's purpose is the <strong>Multi-Perspective Information Visualization of Linked Data.</strong> </h1>
          <p className='paragraphHome'>In this 0.1a Version you have the option to search for <strong>Movies</strong>, <strong>Directors</strong>,  <strong>Actors</strong>, <strong>All actors who played with certain Actor</strong>, <strong>Film character names</strong>, <strong>Film  Subjects</strong> and <strong>Art Directors</strong>.  The results are based on what you input in the search fields. They also contain links and metadata about your input.  The information is coming direclty from the <strong>Linked Movie Database</strong> <a href="http://data.linkedmdb.org">LMDB</a>. You can choose the type of visualization for the results.(Tables, Graph, etc.)  </p>
          
           </div> /* end Home */
    );
  }
}

export default Home;
