/* eslint-disable react/jsx-no-target-blank, no-useless-concat*/
import React, { Component } from 'react';

import { FormControl, Button, FormGroup, Popover} from 'react-bootstrap';

import {FaInfo, FaSearch, FaDownload, FaArrowCircleRight, FaClose} from 'react-icons/lib/fa';

import {GoGraph} from 'react-icons/lib/go/'

import { CSVLink } from 'react-csv/lib';

// import  set  from "./set.jpg";
// import  entrance  from "./entrance.jpg";
// import  kinoSalon  from "./kinoSalon.jpg";
// import  jumbotronImg  from "./moodBoard.jpg";


// TO DO



// ---------------------------------------------------------------

//  DOWNLOAD AS ...........
// {/* {this.state.jsonSave} */} --> in render()


// this.state = { jsonSave: [] }; -- declaration


//  const myObj = JSON.stringify(x.Nf);
//       this.setState({jsonSave: myObj});   --> inside dataTable function


// -------------------------------------------------------






// ACTOR X ACTOR

// PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors ?Link_To_Actor_Page (COUNT(?Names_Of_Actors) AS ?total) WHERE { ?link mov:actor_name 'woody allen'  . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors .  FILTER (?link != ?Link_To_Actor_Page)} GROUP BY ?total ?Names_Of_Actors  ORDER BY ASC(?total) limit 50

// -------SANKEY FOR FAVORITE ACTORS OF THE DIFFERENT DIRECTORS ----------

// SELECT DISTINCT ?actorName ?d1  (COUNT(?actorName) AS ?Number_Of_Instances) WHERE {?dir1      <http://data.linkedmdb.org/resource/movie/director_name> 'francis ford coppola'.?dir2      <http://data.linkedmdb.org/resource/movie/director_name>'Steven Spielberg'.?dir1movie <http://data.linkedmdb.org/resource/movie/director> ?dir1;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?dir1  <http://data.linkedmdb.org/resource/movie/director_name> ?d1 .?dir2movie <http://data.linkedmdb.org/resource/movie/actor> ?actor;<http://data.linkedmdb.org/resource/movie/director> ?dir2 .?dir2  <http://data.linkedmdb.org/resource/movie/director_name> ?d2 .?actor     <http://data.linkedmdb.org/resource/movie/actor_name> ?actorName.} GROUP BY ?actorName ?d1 ?d2 ORDER BY ?Number_Of_Instances


// ------------- WORD TREE FOR FAVORITE ACTORS OF 1 DIRECTOR --------

// ADG.query(" SELECT  ?Actor_Names (COUNT(?Actor_Names) AS ?Number_Of_Instances)   WHERE {?director<http://data.linkedmdb.org/resource/movie/director_name>  '"+fAOD +"'.?movie  <http://data.linkedmdb.org/resource/movie/director> ?director;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Names.?director <http://data.linkedmdb.org/resource/movie/director_name>  ?d } GROUP BY ?Actor_Names  ORDER BY ?Number_Of_Instances" )
//           .endpointURL("http://data.linkedmdb.org/sparql")
//           .endpointOutputFormat("jsonp") 
//           .chartFunction("google.visualization.WordTree")
//           (1100)
//           .chartHeight(1100)
//           .draw("searchResults");
 

 // !!WORKING FURTHER VISUALIZATION  -> ACTOR .chartFunction("google.visualization.OrgChart") !!




// Get all Actors who participated in CERTAIN(EXACT NAME OF MOVIE) INPUT NAME
// PREFIX dc: <http://purl.org/dc/terms/>
// PREFIX movie: <http://data.linkedmdb.org/resource/movie/>
// SELECT ?id ?filmTitle ?actorName WHERE {

// ?film a movie:film ;
// dc:title "The Mexican" ;
// dc:title ?filmTitle ;
// movie:actor [ a movie:actor ;
// movie:actor_name ?actorName ].
// }




/* We can change the 1st query for the movies search if the users know THE !! EXACT !! Name
 of the movie they are searching --> !! Note only the last line is different !!
 PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> 
PREFIX dc: <http://purl.org/dc/terms/> SELECT ?movieName ?resource WHERE {?resource dc:title ?movieName .?resource mdb:id ?uri . ?resource dc:title '" + movieSearch +  "'}"
*/

  




class Visualization extends Component {
  constructor(){
    super();

    //States

    this.state = { hideMovies: false }; // hide div#movies when called
    this.state = { showButtonGraph: false }; // Button for Graph Visualization.
    this.state = { showButtonTable: false }; // Button Table Visualization.
    this.state = { showButtonCharts: false }; // Button Charts Visualization.
    this.state = { clearButton: false }; //clear results button
    this.state = { Tooltip: false }; //tooltip 
    this.state = { ResultsToolTip: false }; // ResultsToolTip



    this.state = { popUpMenu: false }; // popUpMenu

    this.state = { jsonSave: [] };
    this.state = { download: false};

    
    this.state = { collaps: false }; //interactive search state

    
    //interactive search state
    this.state = { interactiveSearch: false }; //interactive search state
    this.state = { spanShowHide: 'Show' }; //interactive search state
   
   
   

    
  

//Bindings

    //SEARCH
    this.searchSubmit = this.searchSubmit.bind(this);

    //interative search
    this.interactiveSearchSubmit = this.interactiveSearchSubmit.bind(this);
    
    // show advanced search
    this.showAdvancedSearch = this.showAdvancedSearch.bind(this);


    //Delete Results
    this.clearButton = this.clearButton.bind(this);


/*Movies, Actors, Tables and Graphs BINDINGS
     Since functionallity is changed we don't need to bind the functions because they
     aren't called when button is clicked --> the dynamic buttons handle this now
    */
    
    
    // Dynamic buttons.
    this.buttonsVisualizationsGraphs = this.buttonsVisualizationsGraphs.bind(this); 
    this.buttonsVisualizationsTables = this.buttonsVisualizationsTables.bind(this); 
    this.buttonsVisualizationsCharts = this.buttonsVisualizationsCharts.bind(this); 
   
   
  }
  componentDidMount() {
     this.setState({visibility: 'hidden'});
     
    
     
  }

  //capitalize user input
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

 

  showPopMenu(e){
    e.preventDefault();
    this.setState(prevState => ({
      popUpMenu: !this.state.popUpMenu
    }));
    this.setState({Tooltip: false});
    this.setState({ResultsToolTip: false});
  }



interactiveSearchSubmit(e){
  e.preventDefault();

  const interactiveSearch = this.interactiveSearchSelectInput.value;
  switch(interactiveSearch) {
    case 'all':
    return this.interactiveAllSearchSubmit(); 

    case 'actorsInteractive':
    return this.interactiveActorSearchSubmit(); 

    case 'artDirectorInteractive':
    return this.interactiveArtDirectorSearchSubmit(); 

    default: 
      return null; 
  }
}

interactiveAllSearchSubmit(){

//   const orderBy = this.interactiveSearchOrderInput.value; //get the value of order the user has selected
//     var D = new window.sgvizler.Query();
    
//     //Initialize sgvizler Query for Movies and links 
// D.query( " SELECT ?class (count(?instance) AS ?noOfInstances) WHERE{ ?instance a ?class } GROUP BY ?class ORDER BY "+orderBy+" (?class) ")
//  .endpointURL("http://data.linkedmdb.org/sparql")
//  .endpointOutputFormat("jsonp")
//  .chartFunction("google.visualization.PieChart")
//  .chartHeight(800)
//  .chartWidth(1200)
//  .draw("searchResults");

this.setState({ collaps: true });
this.setState({ hideMovies: false });


//  this.setState({ hideMovies: true });
 this.setState({ visibility: 'hidden' });
 this.setState({ showButtonCharts: false });
 this.setState({ showButtonGraph: false });
 this.setState({ showButtonTable: false });
 this.setState({ clearButton: false });
 this.setState({ spanShowHide: 'Show'});
 this.setState({ download: false});
 
  
}


interactiveActorSearchSubmit(){

  const orderBy = this.interactiveSearchOrderInput.value; //get the order the user has selected 

    var A = new window.sgvizler.Query();
   
    //Initialize sgvizler Query for Movies and links 
A.query( " SELECT ?Actor_Name (COUNT(?Actor_Name) AS ?total) WHERE { ?Actor_Link <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Name } GROUP BY ?Actor_Name ?total ORDER BY "+orderBy+"  (?Actor_Name) LIMIT 300")
 .endpointURL("http://data.linkedmdb.org/sparql")
 .endpointOutputFormat("jsonp")
 .chartFunction("google.visualization.PieChart")
 .chartHeight(800)
 .chartWidth(1200)
 .draw("searchResults");

 this.setState({ hideMovies: true });
 this.setState({ visibility: 'hidden' });
 this.setState({ showButtonCharts: false });
 this.setState({ showButtonGraph: false });
 this.setState({ showButtonTable: false });
 this.setState({ clearButton: false });
 this.setState({ spanShowHide: 'Show'});
 this.setState({ download: false});
}


interactiveArtDirectorSearchSubmit(){

  const orderBy = this.interactiveSearchOrderInput.value; //get the order the user has selected 

    var Ad = new window.sgvizler.Query();
   
    //Initialize sgvizler Query for Movies and links 
Ad.query( " SELECT DISTINCT ?ArtDirector_Name (COUNT(?ArtDirector_Name) AS ?total)  WHERE { ?ArtDirector_Link <http://data.linkedmdb.org/resource/movie/film_art_director_name> ?ArtDirector_Name }GROUP BY ?ArtDirector_Name ?total ORDER BY "+orderBy+"  (?ArtDirector_Name) LIMIT 300")
 .endpointURL("http://data.linkedmdb.org/sparql")
 .endpointOutputFormat("jsonp")
 .chartFunction("google.visualization.ColumnChart")
 .chartHeight(1200)
 .chartWidth(1200)
 .draw("searchResults");

 this.setState({ hideMovies: true });
 this.setState({ visibility: 'hidden' });
 this.setState({ showButtonCharts: false });
 this.setState({ showButtonGraph: false });
 this.setState({ showButtonTable: false });
 this.setState({ clearButton: false });
 this.setState({ spanShowHide: 'Show'});
 this.setState({ download: false});
 
}

hideButtons(){
 this.setState({ showButtonCharts: false });
 this.setState({ showButtonGraph: false });
 this.setState({ showButtonTable: false });
 this.setState({ clearButton: false});
 this.setState({ download: false});
 this.setState({ hideMovies: false});
 this.setState({ Tooltip: false});
 this.setState({ ResultsToolTip: false});
 
}


showAdvancedSearch(e){
  e.preventDefault();
  
  // oneSearch display: true
  if (this.state.visibility === 'hidden') {
    this.setState({ visibility:'visible'});
    this.hideButtons();
    this.setState({ spanShowHide: 'Hide'});
    this.setState({ collaps: false});
  } else {
    this.setState({visibility:'hidden'});
    this.hideButtons();
    this.setState({ spanShowHide: 'Show'});
    // window.location.reload(); force restart page
  }
  

}
  
 

  //------------------------------- SEARCH -----------------------------------------

  searchSubmit(event){
     event.preventDefault();
    const searchString = this.searchInput.value;
    const selectedSearch = this.searchSelectInput.value;
    
    
//Elegantly handle Search + Selected Input of the users 
// * !! NO n-cases of if searchString === "" && selectedSearch === 'value1 , value2, ..., '  !! 
// ** !! Dynamically changeable selected form value extraction !!
 

    if(searchString === "") {
      this.setState ({ Tooltip: true });
      this.setState({ hideMovies: false });
      this.setState({ showButtonGraph: false });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: false });
      this.setState({ ResultsToolTip: false });
    }
    else {
      switch(selectedSearch) {
        case 'director':
        return this.directorSubmit(); 

      case 'movies':
        return this.moviesSubmit(); 
      
      case 'actor':
        return this.actorsSubmit(); 
  
      case 'actor X Actor':
        return this.actorXactorSubmit();
     
        case 'film Character':
         return this.filmCharacterSubmit();
    
        case 'film Subject':
         return this.filmSubjectSubmit();
    
        case 'art Director':
         return this.artDirectorSubmit();

        case 'favorite Actor of director':
         return this.favoriteActorOfDirectorSubmit();

        default: 
          return null; 
      }

    }
    
  }


//------------------------------- DYNAMIC BUTTONS --------------------------------------------

  //Another elegant solution to the Graphs and Tables Buttons problem.
  // PROBLEM: Before we had for each category (Movies, Actors, Actor X Actor) -->
  //  --> 3 buttons (Graphs, Tables, Clear) x 3 = 12 buttons
  // ** Solution: Make dynamically changeable buttons for Tables and Graph for each category CLASS ==>  Have only 3 Buttons and switch between them if the user searches in (Movies, Actor or  Actor X Actor) category !

buttonsVisualizationsGraphs(e) {
    e.preventDefault();
    const selectedSearch = this.searchSelectInput.value;

    
    switch(selectedSearch) {
      case 'director':
        return this.directorGraph(); 

      case 'movies':
        return this.moviesGraph(); 
        
      case 'actor':
        return this.actorsGraph(); 
        
      case 'actor X Actor':
        return this.actorXactorGraph();

        case 'film Character':
        return this.filmCharacterGraph();
        
        case 'film Subject':
        return this.filmSubjectGraph();

        case 'art Director':
         return this.artDirectorGraph();

        case 'favorite Actor of director':
         return this.favoriteActorOfDirectorGraph();
        

        default: 
          return null; 
    }

}



buttonsVisualizationsTables(e) {
    e.preventDefault();
    const selectedSearch = this.searchSelectInput.value;

    
    switch(selectedSearch) {
      case 'director':
        return this.directorSubmit(); 

      case 'movies':
        return this.moviesSubmit(); 
        
      case 'actor':
        return this.actorsSubmit(); 

      case 'actor X Actor':
        return this.actorXactorSubmit();

        case 'film Character':
        return this.filmCharacterSubmit();

        case 'film Subject':
        return this.filmSubjectSubmit();

        case 'art Director':
         return this.artDirectorSubmit();

        case 'favorite Actor of director':
         return this.favoriteActorOfDirectorSubmit();

        default: 
          return null; 
    }

}

buttonsVisualizationsCharts(e) {
  e.preventDefault();
  const selectedSearch = this.searchSelectInput.value;

  
  switch(selectedSearch) {
    

      case 'favorite Actor of director':
       return this.favoriteActorOfDirectorChart();

      case 'actor X Actor':
       return this.actorXactorChart();

      case 'director':
       return this.directorChart();

      default: 
        return null; 
  }

}
//---------------------------------------- DIRECTOR --------------------------------------------
directorSubmit() {
    
  const directorSearch = this.searchInput.value; //get the value of the searched movie

// TODO
  // Check if the sent query got any results



 
  if ( directorSearch !== '' ) {

    

    var D = new window.sgvizler.Query();
   
    //Initialize sgvizler Query for Movies and links 
D.query( " SELECT DISTINCT ?Name_Of_The_Directed_Movie ?Link_To_The_Movie WHERE { ?director <http://data.linkedmdb.org/resource/movie/director_name> '" + directorSearch +  "'. ?Link_To_The_Movie  <http://data.linkedmdb.org/resource/movie/director> ?director;  <http://purl.org/dc/terms/title> ?Name_Of_The_Directed_Movie.}" )
 .endpointURL("http://data.linkedmdb.org/sparql")
 .endpointOutputFormat("jsonp")
 .chartFunction("sgvizler.visualization.Table")
 .draw("searchResults");
 
 D.getDataTable(function(x) { var r = x.getNumberOfRows()
  if (r < 1) {
    this.setState({ Tooltip: true });
    this.setState({ hideMovies: false });
    this.setState({ showButtonGraph: false });
    this.setState({ showButtonTable: false });
    this.setState({ showButtonCharts: false });
    this.setState({ clearButton: false });
    this.setState({ ResultsToolTip: false });
    this.setState({ download: false});
  } else {
    this.setState({ Tooltip: false });
    //get download data
    const myObj = JSON.stringify(x.Nf);
    this.setState({ jsonSave: myObj });
    this.setState({ download: true});
   
    
  }

}.bind(this));

 
  }
 

//      //Hide/Show elements.
    this.setState({ Tooltip: false });
    this.setState({ hideMovies: true });
    this.setState({ showButtonGraph: true });
    this.setState({ showButtonTable: false });
    this.setState({ showButtonCharts: true });
    this.setState({ clearButton: true });
    this.setState({ ResultsToolTip: true });

}          


directorGraph() {
    
  const directorSearch = this.searchInput.value; //get the value of the searched movie

// TODO
  // Check if the sent query got any results



 
  if ( directorSearch !== '' ) {

    

    var D = new window.sgvizler.Query();
   
    //Initialize sgvizler Query for Movies and links 
D.query( " SELECT DISTINCT  ?directorName ?Name_Of_The_Directed_Movie WHERE { ?director <http://data.linkedmdb.org/resource/movie/director_name> '" + directorSearch +  "'. ?Link_To_The_Movie  <http://data.linkedmdb.org/resource/movie/director> ?director;  <http://purl.org/dc/terms/title> ?Name_Of_The_Directed_Movie. ?director  <http://data.linkedmdb.org/resource/movie/director_name> ?directorName}" )
 .endpointURL("http://data.linkedmdb.org/sparql")
 .endpointOutputFormat("jsonp")
 .chartFunction("sgvizler.visualization.D3ForceGraph")
 .chartWidth(1100)
 .chartHeight(650)
 .draw("searchResults");
 
 
  }
 

//      //Hide/Show elements.
    this.setState({ Tooltip: false });
    this.setState({ hideMovies: true });
    this.setState({ showButtonGraph: false });
    this.setState({ showButtonTable: true });
    this.setState({ showButtonCharts: true });
    this.setState({ clearButton: true });
    this.setState({ ResultsToolTip: true });

}

directorChart() {
    
  const directorSearch = this.searchInput.value; //get the value of the searched movie

// TODO
  // Check if the sent query got any results



 
  if ( directorSearch !== '' ) {

    

    var D = new window.sgvizler.Query();
   
    //Initialize sgvizler Query for Movies and links 
D.query( " SELECT ?Name_Of_The_Directed_Movie (COUNT(?Name_Of_The_Directed_Movie) AS ?Number_Of_Movies)   ?directorName   WHERE { ?director <http://data.linkedmdb.org/resource/movie/director_name> '" + directorSearch +  "'. ?Link_To_The_Movie  <http://data.linkedmdb.org/resource/movie/director> ?director;  <http://purl.org/dc/terms/title> ?Name_Of_The_Directed_Movie. ?director  <http://data.linkedmdb.org/resource/movie/director_name> ?directorName} GROUP BY ?Name_Of_The_Directed_Movie ?Number_Of_Movies" )
 .endpointURL("http://data.linkedmdb.org/sparql")
 .endpointOutputFormat("jsonp")
 .chartFunction("google.visualization.PieChart")
 .chartWidth(1100)
 .chartHeight(650)
 .draw("searchResults");
 
 
  }
 

//      //Hide/Show elements.
    this.setState({ Tooltip: false });
    this.setState({ hideMovies: true });
    this.setState({ showButtonGraph: true });
    this.setState({ showButtonTable: true });
    this.setState({ showButtonCharts: false });
    this.setState({ clearButton: true });
    this.setState({ ResultsToolTip: true });

}
          
         




  //---------------------------------------- MOVIES --------------------------------------------

  moviesSubmit() {
    
    const movieSearch = this.searchInput.value; //get the value of the searched movie

  // TODO
    // Check if the sent query got any results
  
 

   
    if ( movieSearch !== '' ) {

      //------------------------- NEW SOLUTION--------------------------------------------------
      //  if reponse is empty -> inform the user
      // Initialize sgvizler Query for movies

  //  var Q = new window.sgvizler.Query(),
   

  //  onSuccessFunc = function (dataTable) {
  //    var r = dataTable.getNumberOfRows();
  //    if (r < 1) {
  //     this.setState({ Tooltip: true });
  //     this.setState({ hideMovies: false });
  //     this.setState({ showButtonGraph: false });
  //     this.setState({ showButtonTable: false });
  //     this.setState({ clearButton: false });
  //   } else {
  //   this.setState({ Tooltip: false });
  //   }
     
  //  }, 
  //    onFailFunc = function (datatable)
     
  //    {
      
  //    };

  //    var tmp = Q.query( " PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> PREFIX dc: <http://purl.org/dc/terms/> SELECT ?movieName ?resource WHERE {?resource dc:title ?movieName .?resource mdb:id ?uri . FILTER regex(?movieName,'" + movieSearch +  "', 'i')} " )
  //    .endpointURL("http://data.linkedmdb.org/sparql")
  //    .endpointOutputFormat("jsonp");
    
    

  //    tmp.getDataTable(onSuccessFunc.bind(this), onFailFunc.bind(this));
  //    tmp.chartFunction("sgvizler.visualization.Table") 
  //    .draw("searchResults");
     


   
  // GENRE
  //  ?Link <http://data.linkedmdb.org/resource/movie/genre> ?id . ?id <http://data.linkedmdb.org/resource/movie/film_genre_name> ?Genre .
  

      var M = new window.sgvizler.Query();
     
      //Initialize sgvizler Query for Movies and links 
  M.query( " PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> PREFIX dc: <http://purl.org/dc/terms/> SELECT ?Name_Of_The_Movie ?Link WHERE {?Link dc:title ?Name_Of_The_Movie .?Link mdb:id ?uri . FILTER regex(?Name_Of_The_Movie,'" + movieSearch +  "', 'i')}" )
   .endpointURL("http://data.linkedmdb.org/sparql")
   .endpointOutputFormat("jsonp")
   .chartFunction("sgvizler.visualization.Table")
   .draw("searchResults");
   
   M.getDataTable(function(x) { var r = x.getNumberOfRows()
    if (r < 1) {
      this.setState({ Tooltip: true });
      this.setState({ hideMovies: false });
      this.setState({ showButtonGraph: false });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: false });
      this.setState({ ResultsToolTip: false });
      this.setState({ download: false});
        } else {
      this.setState({ Tooltip: false });
      //get download data
      const myObj = JSON.stringify(x.Nf);
      this.setState({ jsonSave: myObj });
      this.setState({ download: true});
     
      
    }
  
  }.bind(this));
  
   
    }
   
  
//      //Hide/Show elements.
      this.setState({ Tooltip: false });
      this.setState({ hideMovies: true });
      this.setState({ showButtonGraph: true });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}

   

  moviesGraph() {
    const movieSearch = this.searchInput.value; //get the value of the searched movie
    var mG = new window.sgvizler.Query();

    //Initialize sgvizler Query for All actors, who have participated in X movie

    mG.query( " PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> PREFIX dc: <http://purl.org/dc/terms/> SELECT ?Name_Of_The_Movie ?Link WHERE {?Link dc:title ?Name_Of_The_Movie .?Link mdb:id ?uri . FILTER regex(?Name_Of_The_Movie,'" + movieSearch +  "', 'i')}" )
      .endpointURL("http://data.linkedmdb.org/sparql")
      .endpointOutputFormat("jsonp") 
      .chartFunction("sgvizler.visualization.D3ForceGraph")
      .chartWidth(1100)
      .chartHeight(650)
      .draw("searchResults");


    //Handle States for buttons
    this.setState({ hideMovies: true });
    this.setState({ showButtonGraph: false });
    this.setState({ showButtonTable: true });
    this.setState({ showButtonCharts: false });
    this.setState({ clearButton: true });
    this.setState({ ResultsToolTip: true });
      
}

clearButton(event) {
  this.searchSelectInput.value = 'Movies';
  this.searchInput.value = '';
  var delQ = new window.sgvizler.Query();

    // Initialize sgvizler Query for results restart.
    delQ.query( " PREFIX mdb: <http://data.linkedmdb.org/resource/movie/film> PREFIX dc: <http://purl.org/dc/terms/> SELECT ?label ?resource WHERE {?resource dc:title ?label .?resource mdb:id ?uri . FILTER regex(?label,' 'i')}" )
      .endpointURL("http://data.linkedmdb.org/sparql")
      .endpointOutputFormat("jsonp") 
      .chartFunction("sgvizler.visualization.D3ForceGraph")
      .draw("searchResults");
      

 
      this.setState({ hideMovies: false });
      this.setState({ showButtonGraph: false });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: false });
      this.setState({ Tooltip: false });
      this.setState({ ResultsToolTip: false });
      this.setState({ download: false });

}

 

//---------------------------------------- ACTORS--------------------------------------------

actorsSubmit(){
  const actorSearch = this.searchInput.value; // get the value of the search actor

  //double check if actorSearch isn't empty!
if (actorSearch !== '') {

          //Initialize sgvizler Query for actors
            var A = new window.sgvizler.Query();

          A.query(" PREFIX dc: <http://purl.org/dc/terms/> PREFIX am: <http://data.linkedmdb.org/resource/movie/actor_name> SELECT  ?Movies_He_Has_Played_In  ?Link_To_The_Movie WHERE { ?Link_To_Actor_Page am: '" + actorSearch +  "' . ?Link_To_Actor_Page am: ?Name_Of_The_Actor .?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/actor> ?Link_To_Actor_Page;dc:title ?Movies_He_Has_Played_In . }")
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("sgvizler.visualization.Table")
          .draw("searchResults");
          A.getDataTable(function(x) { x.getNumberOfRows()
            if (x.getNumberOfRows() < 1) {
              this.setState({ Tooltip: true });
              this.setState({ hideMovies: false });
              this.setState({ showButtonGraph: false });
              this.setState({ showButtonTable: false });
              this.setState({ showButtonCharts: false });
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
              this.setState({ download: false});
            } else {
              this.setState({ Tooltip: false });
              //get download data
              const myObj = JSON.stringify(x.Nf);
              this.setState({ jsonSave: myObj });
              this.setState({ download: true});
   
            }
          
          }.bind(this));

            } 
           
      this.setState({ hideMovies: true });
      this.setState({ showButtonGraph: true });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}

actorsGraph() {
  const actorSearch = this.searchInput.value;
        //Initialize sgvizler Query for actors
        var A = new window.sgvizler.Query();

        A.query(" PREFIX dc: <http://purl.org/dc/terms/> PREFIX am: <http://data.linkedmdb.org/resource/movie/actor_name> SELECT ?actorName  ?movieName ?actorLink     ?movie WHERE { ?actorLink am: '" + actorSearch +  "' . ?actorLink am: ?actorName .?movie <http://data.linkedmdb.org/resource/movie/actor> ?actorLink;dc:title ?movieName . } ")
        .endpointURL("http://data.linkedmdb.org/sparql")
        .endpointOutputFormat("jsonp") 
        .chartFunction("sgvizler.visualization.D3ForceGraph")
        // !!WORKING FURTHER VISUALIZATION .chartFunction("google.visualization.OrgChart") !!
        .chartWidth(1100)
        .chartHeight(650)
        .draw("searchResults");

          // hide/show elements
            this.setState({ showButtonTable: true });
            this.setState({ showButtonGraph: false });
            this.setState({ showButtonCharts: false });
            this.setState({ hideMovies: true });
            this.setState({ clearButton: true });

  }

  actorXactorSubmit(){
    const actorXActorSearch = this.toTitleCase(this.searchInput.value);

    //Initialize sgvizler Query for All Actors that have played with X Actor 
    if (actorXActorSearch !== '') {
      // FILTER (?link != ?Link_To_Actor_Page) . --> Causes problems but without it the searched actor is printed out in the results table
      var B = new window.sgvizler.Query();
        //?actor --> Link of the listed actor; ?link -> link of the searched actor
        B.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors ?Link_To_Actor_Page WHERE { ?link mov:actor_name '" + actorXActorSearch +  "' . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors. FILTER (?Names_Of_Actors != '" + actorXActorSearch +  "')  }   ")
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("sgvizler.visualization.Table")
          .draw("searchResults");
          B.getDataTable(function(x) { x.getNumberOfRows()
            if (x.getNumberOfRows() < 1) {
              this.setState({ Tooltip: true });
              this.setState({ hideMovies: false });
              this.setState({ showButtonGraph: false });
              this.setState({ showButtonTable: false });
              this.setState({ showButtonCharts: false });
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
              this.setState({ download: false});
            } else {
              this.setState({ Tooltip: false });
              //get download data
              const myObj = JSON.stringify(x.Nf);
              this.setState({ jsonSave: myObj });
              this.setState({ download: true});
            }
          
          }.bind(this));

    }

          // hide/show elements

          this.setState({ hideMovies: true});
          this.setState({ clearButton: true });
          this.setState({ showButtonGraph: true });
          this.setState({ showButtonTable: false });
          this.setState({ ResultsToolTip: true });
          this.setState({ showButtonCharts: true });
    
}

    actorXactorGraph() {
    const actorXActorSearch = this.searchInput.value;

    //Initialize sgvizler Query for All Actors that have played with X actor Graph/Table

    var G = new window.sgvizler.Query();
                
        G.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?actorName ?searchedActor ?actor  WHERE { ?link mov:actor_name '" + actorXActorSearch +  "' . ?movie mov:actor ?link; mov:actor ?actor. ?actor mov:actor_name ?actorName.FILTER (?link != ?actor) ?link mov:actor_name ?searchedActor }  ")
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("sgvizler.visualization.D3ForceGraph")
          .chartWidth(1100)
          .chartHeight(650)
          .draw("searchResults");


          //  hide/show elements
          this.setState({ hideMovies: true});
          this.setState({clearButton: true});
          this.setState({ showButtonGraph: false });
          this.setState({ showButtonTable: true });     
          this.setState({ showButtonCharts: true });
    }
   
    
    

actorXactorChart() {
    const actorXActorSearch = this.toTitleCase(this.searchInput.value);
 
    //Initialize sgvizler Query for All Actors that have played with X actor Graph/Table

    console.log(actorXActorSearch);

    var GC = new window.sgvizler.Query();

    //Word Tree
    GC.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors  (COUNT(?Names_Of_Actors) AS ?total)  WHERE { ?link mov:actor_name '" + actorXActorSearch +  "'  . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors .  FILTER (?Names_Of_Actors != '" + actorXActorSearch +  "')} GROUP BY ?Names_Of_Actors  ?total ORDER BY ?total")
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("google.visualization.ColumnChart")
          // .chartFunction("google.visualization.WordTree")
          .chartWidth(1100)
          .chartHeight(650)
          .draw("searchResults");
                
        // G.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors ?Link_To_Actor_Page (COUNT(?Names_Of_Actors) AS ?total) WHERE { ?link mov:actor_name '" + actorXActorSearch +  "'  . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors .  FILTER (?link != ?Link_To_Actor_Page)} GROUP BY ?Names_Of_Actors ?Link_To_Actor_Page  ORDER BY ?total LIMIT 30 ")
          // .endpointURL("http://data.linkedmdb.org/sparql")
          // .endpointOutputFormat("jsonp") 
          // .chartFunction("google.visualization.Sankey")
          // .chartWidth(1100)
          // .chartHeight(650)
          // .draw("searchResults");


          //  hide/show elements
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: true });
          this.setState({ showButtonTable: true });
          this.setState({ showButtonCharts: false });
          this.setState({ clearButton: true });
          this.setState({ ResultsToolTip: true });   
    }

    filmCharacterSubmit(){
  
      const filmCharacterSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (filmCharacterSearch !== '') {
    
              //Initialize sgvizler Query for film character search
                var F = new window.sgvizler.Query();

              F.query("SELECT ?Performing_Actor ?Name_Of_The_Movie  ?Actor_Page ?Link_To_The_Movie WHERE {?Performance_Link <http://data.linkedmdb.org/resource/movie/performance_character> '" + filmCharacterSearch +  "' .?Performance_Link <http://data.linkedmdb.org/resource/movie/performance_actor> ?Performing_Actor .?Performance_Link <http://data.linkedmdb.org/resource/movie/performance_film> ?Name_Of_The_Movie . ?Actor_Page <http://data.linkedmdb.org/resource/movie/actor_name> ?Performing_Actor . ?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/performance> ?Performance_Link . ?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/filmid> ?id.  }")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.Table")
              .draw("searchResults");

              F.getDataTable(function(x) { x.getNumberOfRows()
                if (x.getNumberOfRows() < 1) {
                  this.setState({ Tooltip: true });
                  this.setState({ hideMovies: false });
                  this.setState({ showButtonGraph: false });
                  this.setState({ showButtonTable: false });
                  this.setState({ showButtonCharts: false });
                  this.setState({ clearButton: false });
                  this.setState({ ResultsToolTip: false });
                  this.setState({ download: false});
                }  else {
                  this.setState({ Tooltip: false });
                  //get download data
                  const myObj = JSON.stringify(x.Nf);
                  this.setState({ jsonSave: myObj });
                  this.setState({ download: true});
                }
              
              }.bind(this));
       }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: true });
          this.setState({ showButtonCharts: false });
          this.setState({ showButtonTable: false });
          this.setState({ clearButton: true });
          this.setState({ ResultsToolTip: true });
    
    }
    
    filmCharacterGraph(){
      
      const filmCharacterSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (filmCharacterSearch !== '') {
    
              //Initialize sgvizler Query for actors
                var F = new window.sgvizler.Query();
    
              F.query("SELECT ?performanceActor ?movieName ?link WHERE {?link <http://data.linkedmdb.org/resource/movie/performance_character> '" + filmCharacterSearch +  "' .?link <http://data.linkedmdb.org/resource/movie/performance_actor> ?performanceActor .?link <http://data.linkedmdb.org/resource/movie/performance_film> ?movieName . }")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.D3ForceGraph")
              .chartWidth(1100)
              .chartHeight(650)
              .draw("searchResults");
              }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: false });
          this.setState({ showButtonCharts: false });
          this.setState({ showButtonCharts: false });
          this.setState({ showButtonTable: true });
          this.setState({ clearButton: true });
    
    }

    filmSubjectSubmit(){
      
      const filmSubjectSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (filmSubjectSearch !== '') {
    
              //Initialize sgvizler Query for actors
                var S = new window.sgvizler.Query();
   
              S.query(" SELECT DISTINCT ?Name_Of_The_Movie ?Link_To_The_Movie ?Director_Of_The_Movie  WHERE {?subject <http://data.linkedmdb.org/resource/movie/film_subject_name> '" + filmSubjectSearch +  "'. ?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/film_subject> ?subject  . ?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/director> ?director . ?director <http://data.linkedmdb.org/resource/movie/director_name> ?Director_Of_The_Movie . ?Link_To_The_Movie <http://purl.org/dc/terms/title> ?Name_Of_The_Movie} ")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.Table")
              .draw("searchResults");

              S.getDataTable(function(x) { x.getNumberOfRows()
                if (x.getNumberOfRows() < 1) {
                  this.setState({ Tooltip: true });
                  this.setState({ hideMovies: false });
                  this.setState({ showButtonGraph: false });
                  this.setState({ showButtonTable: false });
                  this.setState({ showButtonCharts: false });
                  this.setState({ clearButton: false });
                  this.setState({ ResultsToolTip: false });
                  this.setState({ download: false});
                }  else {
                  this.setState({ Tooltip: false });
                  //get download data
                  const myObj = JSON.stringify(x.Nf);
                  this.setState({ jsonSave: myObj });
                  this.setState({ download: true});
                }
              
              }.bind(this));
       }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: true });
          this.setState({ showButtonTable: false });
          this.setState({ showButtonCharts: false });
          this.setState({ clearButton: true });
          this.setState({ ResultsToolTip: true });
    
    }

    filmSubjectGraph(){
      
      const filmSubjectSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (filmSubjectSearch !== '') {
     
                var F = new window.sgvizler.Query();
    
              F.query(" SELECT ?subjectName ?movieName ?movieLink WHERE {?subject <http://data.linkedmdb.org/resource/movie/film_subject_name> '" + filmSubjectSearch +  "' . ?subject <http://data.linkedmdb.org/resource/movie/film_subject_name> ?subjectName  . ?movieLink <http://data.linkedmdb.org/resource/movie/film_subject> ?subject . ?movieLink <http://purl.org/dc/terms/title> ?movieName} ")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.D3ForceGraph")
              .chartWidth(1100)
              .chartHeight(650)
              .draw("searchResults");
              }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: false });
          this.setState({ showButtonCharts: false });
          this.setState({ showButtonTable: true });
          this.setState({ clearButton: true });
    
    }

    artDirectorSubmit() {

      const artDirectorSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (artDirectorSearch !== '') {
    
              //Initialize sgvizler Query for actors
                var W = new window.sgvizler.Query();
    
              W.query(" SELECT  ?Name_Of_The_Movie ?Director_Worked_With WHERE { ?artD <http://data.linkedmdb.org/resource/movie/film_art_director_name> '" + artDirectorSearch +  "'. ?movie <http://data.linkedmdb.org/resource/movie/film_art_director> ?artD;<http://data.linkedmdb.org/resource/movie/director> ?director;<http://purl.org/dc/terms/title> ?Name_Of_The_Movie . ?director <http://data.linkedmdb.org/resource/movie/director_name> ?Director_Worked_With. } ")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.Table")
              .draw("searchResults");

              W.getDataTable(function(x) { x.getNumberOfRows()
                if (x.getNumberOfRows() < 1) {
                  this.setState({ Tooltip: true });
                  this.setState({ hideMovies: false });
                  this.setState({ showButtonGraph: false });
                  this.setState({ showButtonTable: false });
                  this.setState({ showButtonCharts: false });
                  this.setState({ clearButton: false });
                  this.setState({ ResultsToolTip: false });
                  this.setState({ download: false});
                }  else {
                  this.setState({ Tooltip: false });
                  //get download data
                  const myObj = JSON.stringify(x.Nf);
                  this.setState({ jsonSave: myObj });
                  this.setState({ download: true});
                }
              
              }.bind(this));
        }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: true });
          this.setState({ showButtonTable: false });
          this.setState({ showButtonCharts: false });
          this.setState({ clearButton: true });
          this.setState({ ResultsToolTip: true });

    }
    artDirectorGraph() {

      const artDirectorSearch = this.searchInput.value; // get the value of the search actor
    
      //double check if film Character Search isn't empty!
    if (artDirectorSearch !== '') {
    
              //Initialize sgvizler Query for actors
                var W = new window.sgvizler.Query();
    
              W.query(" SELECT  ?movieName ?ArtDirector ?directorName   WHERE { ?artD <http://data.linkedmdb.org/resource/movie/film_art_director_name> '" + artDirectorSearch +  "'. ?movie <http://data.linkedmdb.org/resource/movie/film_art_director> ?artD;<http://data.linkedmdb.org/resource/movie/director> ?director;<http://purl.org/dc/terms/title> ?movieName . ?director <http://data.linkedmdb.org/resource/movie/director_name> ?directorName. ?artD <http://data.linkedmdb.org/resource/movie/film_art_director_name> ?ArtDirector . } ")
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("sgvizler.visualization.D3ForceGraph")
              .chartWidth(1100)
              .chartHeight(650)
              .draw("searchResults");
              }  
          this.setState({ hideMovies: true });
          this.setState({ showButtonGraph: false });
          this.setState({ showButtonCharts: false });
          this.setState({ showButtonTable: true });
          this.setState({ clearButton: true });

    }

//--------------------------------------  FAVORITE ACTOR OF DIRECTOR XX---------------------
favoriteActorOfDirectorSubmit() {

  const fAOD = this.searchInput.value; // get the value of the search actor

  //double check if film Character Search isn't empty!
if (fAOD !== '') {

          //Initialize sgvizler Query for actors
            var AD = new window.sgvizler.Query();

          AD.query(" SELECT ?Actor_Names (COUNT(?Actor_Names) AS ?Number_Of_Instances)  WHERE {?director<http://data.linkedmdb.org/resource/movie/director_name>  '" + fAOD +  "'.?movie  <http://data.linkedmdb.org/resource/movie/director> ?director;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Names.} GROUP BY ?Actor_Names ORDER BY ?Number_Of_Instances" )
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("sgvizler.visualization.Table")
          .draw("searchResults");

          AD.getDataTable(function(x) { x.getNumberOfRows()
            if (x.getNumberOfRows() < 1) {
              this.setState({ Tooltip: true });
              this.setState({ hideMovies: false });
              this.setState({ showButtonGraph: false });
              this.setState({ showButtonTable: false });
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
              this.setState({ download: false});
            }  else {
              this.setState({ Tooltip: false });
              //get download data
              const myObj = JSON.stringify(x.Nf);
              this.setState({ jsonSave: myObj });
              this.setState({ download: true});
            }
          
          }.bind(this));
    }  
      this.setState({ hideMovies: true });
      this.setState({ showButtonGraph: true });
      this.setState({ showButtonTable: false });
      this.setState({ showButtonCharts: true });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}

favoriteActorOfDirectorGraph() {

  const fAOD = this.searchInput.value; // get the value of the search actor

  //double check if film Character Search isn't empty!
if (fAOD !== '') {

          //Initialize sgvizler Query for actors
            var ADG = new window.sgvizler.Query();

          ADG.query(" SELECT ?Actor_Names (COUNT(?Actor_Names) AS ?Number_Of_Instances)  WHERE {?director<http://data.linkedmdb.org/resource/movie/director_name>  '" + fAOD +  "'.?movie  <http://data.linkedmdb.org/resource/movie/director> ?director;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Names.} GROUP BY ?Actor_Names ORDER BY ?Number_Of_Instances" )
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("sgvizler.visualization.D3ForceGraph")
          .chartWidth(1100)
          .chartHeight(650)
          .draw("searchResults");

          ADG.getDataTable(function(x) { x.getNumberOfRows()
            if (x.getNumberOfRows() < 1) {
              this.setState({ Tooltip: true });
              this.setState({ hideMovies: false });
              this.setState({ showButtonGraph: false });
              this.setState({ showButtonTable: false });
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
            }  else {
              this.setState({ Tooltip: false });
            }
          
          }.bind(this));
    }  
      this.setState({ hideMovies: true });
      this.setState({ showButtonGraph: false });
      this.setState({ showButtonTable: true });
      this.setState({ showButtonCharts: true });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}

favoriteActorOfDirectorChart() {

  const fAOD = this.searchInput.value; // get the value of the search actor

  //double check if film Character Search isn't empty!
if (fAOD !== '') {

          //Initialize sgvizler Query for actors
            var ADC = new window.sgvizler.Query();

      //**?d = directorName
      // ?Actor_Names ?d ... GROUP BY ?Actor_Names ?d == Sankey
              ADC.query(" SELECT  ?Actor_Names (COUNT(?Actor_Names) AS ?Number_Of_Instances)   WHERE {?director<http://data.linkedmdb.org/resource/movie/director_name>  '"+fAOD +"'.?movie  <http://data.linkedmdb.org/resource/movie/director> ?director;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Names.?director <http://data.linkedmdb.org/resource/movie/director_name>  ?d } GROUP BY ?Actor_Names  ORDER BY ?Number_Of_Instances"  )
              .endpointURL("http://data.linkedmdb.org/sparql")
              .endpointOutputFormat("jsonp") 
              .chartFunction("google.visualization.ColumnChart")
              .chartWidth(1100)
              .chartHeight(650)
              .draw("searchResults");

          ADC.getDataTable(function(x) { x.getNumberOfRows()
            if (x.getNumberOfRows() < 1) {
              this.setState({ Tooltip: true });
              this.setState({ hideMovies: false });
              this.setState({ showButtonGraph: false });
              this.setState({ showButtonTable: false });
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
            }  else {
              this.setState({ Tooltip: false });
            }
          
          }.bind(this));
    }  
      this.setState({ hideMovies: true });
      this.setState({ showButtonGraph: true });
      this.setState({ showButtonTable: true });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}



  render() 
  
          {
            
     
   
    const divStyle = {
      visibility: this.state.visibility,
      
    }

    return (
      
      <div className="Visualization">
      <Button className="popButton" type="submit" onClick={this.showPopMenu.bind(this)}>  <FaInfo /> </Button>
      { this.state.popUpMenu ? 
       <Popover placement="top" id='popover-menu' title="LMDB - VIZ" positionLeft={60} positionTop={10}>
       <div className="Home">
          <p className="paragraphHome">This App's purpose is the <strong>Multi-Perspective Information Visualization of Linked Data.</strong></p>
          <p className="paragraphHome">Under advanced search you can further specify your desired results and choose between types of visualization(Tables, Graph, etc.). In this 0.1 version you have the option to search for <strong>Movies</strong>, <strong>Directors</strong>, <strong>Actors</strong>, <strong>Actor X Actor - All actors who played with certain Actor</strong>, <strong>Film character names</strong>, <strong>Film  Subjects</strong>, <strong>Art Directors</strong> and <strong>Favorite Actors of Directors</strong>. The information is coming direclty from the <strong>Linked Movie Database</strong> <a href="http://data.linkedmdb.org">LMDB</a>. 
          </p>
          
           </div> 
    </Popover>
  : null
  }

      {/* <div className="Jumbotron">
      <img src={kinoSalon} alt="Kino Salon" id="kinoSalon"/>
      <img src={entrance} alt="Kino entrance" id="michigan"/>
      <img src={set} alt="movie set" id="set"/>
     
       </div>  */}
      
      {/* <h1 className="headerSearch">
      You can search for one the following: Movie, Director, Actor, Film Character name, Film Subject or Art Director or Favorite Actors of Director
      </h1> */}
      
      <p className="Introduction">LMDB-Viz is an app for movie information with many possible visualizations. You can directly press "Go" or choose another category and <br /> order in the field below to see a demo. </p>
      <div className="InteractiveSearch">

<form className="form-inline" id='formInteractive' onSubmit={this.interactiveSearchSubmit}>
      <FormGroup>  
      <FormControl componentClass="select" inputRef={(ref) => {this.interactiveSearchSelectInput = ref}} >
        <option value="all">All available data</option>
        <option value="actorsInteractive">Actors</option>
        <option value="artDirectorInteractive">Film Art Director</option>
        </FormControl>   
      <FormControl componentClass="select" inputRef={(ref) => {this.interactiveSearchOrderInput = ref}} >
        <option value="ASC">Name Ascending</option>
        <option value="DESC">Name Descending</option>
       
             </FormControl>
             <Button className="SearchBtn" type="submit" bsStyle="default" style={{color:"black", background:"#e6e610"}}>Go <GoGraph /></Button>
      </FormGroup> 
      
      </form>  

      <span className="advancedSearch" onClick={this.showAdvancedSearch}> <FaArrowCircleRight /> {this.state.spanShowHide} advanced search</span>

{ this.state.collaps ?  
  <div className="container" style={{  width: '1200px', height: '1200px'}}   id="searchResults">
  {/* <Tree data={this.state.myTreeData}  translate={{x:250, y:355}} zoom={0.8} initialDepth={1} separation={{siblings: 0.5}} /> */}
  <iframe src="https://freaksn.github.io/test/" width="1200" height="900" frameBorder="0" title="Collapsible Tree">


</iframe>
  </div> 
   : null 
 }
         

 <p className = "paragraphSearch" style={divStyle}> </p>

 <div className="oneSearch" style={divStyle}>     
      <form className="form-inline" id='formSearch' onSubmit={this.searchSubmit}>
      <FormGroup>
      <FormControl type="text" placeholder="Search " inputRef={(ref) => {this.searchInput = ref}}/>  
      <FormControl componentClass="select" placeholder="Select category" inputRef={(ref) => {this.searchSelectInput = ref}} >
  
        <option value="movies">Movies</option>
        <option value="director">Director</option>
        <option value="actor">Actors</option>
        <option value="actor X Actor">Actor X Actor</option>
        <option value="film Character">Film Character</option>
        <option value="film Subject">Film Subject</option>
        <option value="art Director">Art Director</option>
        <option value="favorite Actor of director">Favorite Actor of Director</option>

      </FormControl>
      <Button className="SearchBtn" type="submit" bsStyle="default" style={{color:"black", background:"#e6e610"}}>Search <FaSearch /></Button>
      </FormGroup> 
      
      </form>  {/* end form-inline */}
      
      
      { this.state.ResultsToolTip ?
      <Popover placement="top" id='popover-positioned-top' positionLeft={310} positionTop={285}>
      <strong>"{this.toTitleCase(this.searchInput.value)}"</strong> in category: <strong>"{this.toTitleCase(this.searchSelectInput.value)}"</strong>
      </Popover>
    
      : null
    }
    { this.state.clearButton ? 
      <Button className="clearButton" style={{ background:"red", color:"#ccccb3"}} onClick={this.clearButton} >  <FaClose /> </Button>
      : null
      }

   
    
   </div> {/* end oneSearch  */}
    
   </div>  {/*end InteractiveSearch */}

   
    

        {/* TO DO if no results found*/}

      { this.state.Tooltip ?
      <Popover placement="top" id='popover-positioned-bottom' positionLeft={310} positionTop={285}>
         No results for <strong>"{this.toTitleCase(this.searchInput.value)}"</strong> in category: <strong>"{this.toTitleCase(this.searchSelectInput.value)}"</strong> were found.
      </Popover>
     
      : null
    }
   
      
        {/* Buttons for Graph/Table?Charts Visualization */}

       { this.state.showButtonGraph ? 
       <Button className="showGraph" type="submit" bsStyle="default" style={{ background:"#a61ea9", color:"#ccccb3"}} onClick={this.buttonsVisualizationsGraphs}>See results as Graph </Button>
      : null
      }
      
        {/* Buttons for Graph/Table/Charts Visualization */}

      { this.state.showButtonTable ? 
      <Button className="showTable" type="submit" bsStyle="default" style={{ background:"#a61ea9", color:"#ccccb3"}} onClick={this.buttonsVisualizationsTables}>See results as Table </Button>
      : null
      }   

        {/* Buttons for Graph/Table/Charts Visualization */}

      { this.state.showButtonCharts ? 
      <Button className="showChart" type="submit" bsStyle="default" style={{ background:"#a61ea9", color:"#ccccb3"}} onClick={this.buttonsVisualizationsCharts}>See results as Chart </Button>
      : null
      }   

      { this.state.download ?  
  <Button className="downloadButton" type="submit" bsStyle="default" style={{ background:"white", color:"#ccccb3"}}><CSVLink data={this.state.jsonSave}><FaDownload /> Excel File</CSVLink></Button>
   : null 
 }
      
       
      
       {/* show table/graph results for search input */}
        { this.state.hideMovies ?  
       <div className="container"   id="searchResults">
       </div> 
        : null 
      }


      

      
     

      
      </div> //End Visualization
      
    );
  }
}

export default Visualization;


