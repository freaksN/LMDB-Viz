import React, { Component } from 'react';
import { FormControl, Button, FormGroup, Popover} from 'react-bootstrap';

import {FaBars, FaSearch} from 'react-icons/lib/fa';



// TO DO

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

    

    
  

//Bindings

    //SEARCH
    this.searchSubmit = this.searchSubmit.bind(this);

    


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

  showPopMenu(e){
    e.preventDefault();
    this.setState(prevState => ({
      popUpMenu: !prevState.popUpMenu
    }));
    this.setState({Tooltip: false});
    this.setState({ResultsToolTip: false});
  }
  




  //---------------------------------------- SEARCH -----------------------------------------

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
  
      case 'actorXActor':
        return this.actorXactorSubmit();
     
        case 'filmCharacter':
         return this.filmCharacterSubmit();
    
        case 'filmSubject':
         return this.filmSubjectSubmit();
    
        case 'artDirector':
         return this.artDirectorSubmit();

        case 'favoriteActor':
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
        
      case 'actorXActor':
        return this.actorXactorGraph();

        case 'filmCharacter':
        return this.filmCharacterGraph();
        
        case 'filmSubject':
        return this.filmSubjectGraph();

        case 'artDirector':
         return this.artDirectorGraph();

        case 'favoriteActor':
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

      case 'actorXActor':
        return this.actorXactorSubmit();

        case 'filmCharacter':
        return this.filmCharacterSubmit();

        case 'filmSubject':
        return this.filmSubjectSubmit();

        case 'artDirector':
         return this.artDirectorSubmit();

        case 'favoriteActor':
         return this.favoriteActorOfDirectorSubmit();

        default: 
          return null; 
    }

}

buttonsVisualizationsCharts(e) {
  e.preventDefault();
  const selectedSearch = this.searchSelectInput.value;

  
  switch(selectedSearch) {
    

      case 'favoriteActor':
       return this.favoriteActorOfDirectorChart();

      case 'actorXActor':
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
   
  
  } else {
    this.setState({ Tooltip: false });
   
    
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
 
 D.getDataTable(function(x) { var r = x.getNumberOfRows()
  if (r < 1) {
    this.setState({ Tooltip: true });
    this.setState({ hideMovies: false });
    this.setState({ showButtonGraph: false });
    this.setState({ showButtonTable: false });
    this.setState({ showButtonCharts: false });
    this.setState({ clearButton: false });
    this.setState({ ResultsToolTip: false });
   
  
  } else {
    this.setState({ Tooltip: false });
   
    
  }

}.bind(this));

 
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
 
 D.getDataTable(function(x) { var r = x.getNumberOfRows()
  if (r < 1) {
    this.setState({ Tooltip: true });
    this.setState({ hideMovies: false });
    this.setState({ showButtonGraph: false });
    this.setState({ showButtonTable: false });
    this.setState({ showButtonCharts: false });
    this.setState({ clearButton: false });
    this.setState({ ResultsToolTip: false });
   
  
  } else {
    this.setState({ Tooltip: false });
   
    
  }

}.bind(this));

 
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
     
    
    } else {
      this.setState({ Tooltip: false });
     
      
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
      (1200)
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

}

 

//---------------------------------------- ACTORS--------------------------------------------

actorsSubmit(){
  const actorSearch = this.searchInput.value; // get the value of the search actor

  //double check if actorSearch isn't empty!
if (actorSearch !== '') {

          //Initialize sgvizler Query for actors
            var A = new window.sgvizler.Query();

          A.query(" PREFIX dc: <http://purl.org/dc/terms/> PREFIX am: <http://data.linkedmdb.org/resource/movie/actor_name> SELECT  ?Movies_He_Has_Played_In ?Link_To_Actor_Page     ?Link_To_The_Movie WHERE { ?Link_To_Actor_Page am: '" + actorSearch +  "' . ?Link_To_Actor_Page am: ?Name_Of_The_Actor .?Link_To_The_Movie <http://data.linkedmdb.org/resource/movie/actor> ?Link_To_Actor_Page;dc:title ?Movies_He_Has_Played_In . }")
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
            } else {
              this.setState({ Tooltip: false });
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
    const actorXActorSearch = this.searchInput.value;

    //Initialize sgvizler Query for All Actors that have played with X Actor 
    if (actorXActorSearch !== '') {
      // FILTER (?link != ?Link_To_Actor_Page) . --> Causes problems but without it the searched actor is printed out in the results table
      var B = new window.sgvizler.Query();
        //?actor --> Link of the listed actor; ?link -> link of the searched actor
        B.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors ?Link_To_Actor_Page WHERE { ?link mov:actor_name '" + actorXActorSearch +  "' . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors.  }   ")
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
              this.setState({ clearButton: false });
              this.setState({ ResultsToolTip: false });
            } else {
              this.setState({ Tooltip: false });
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
    const actorXActorSearch = this.searchInput.value;

    //Initialize sgvizler Query for All Actors that have played with X actor Graph/Table

    var G = new window.sgvizler.Query();


                
        G.query(" PREFIX mov: <http://data.linkedmdb.org/resource/movie/> SELECT DISTINCT ?Names_Of_Actors ?Link_To_Actor_Page (COUNT(?Names_Of_Actors) AS ?total) WHERE { ?link mov:actor_name '" + actorXActorSearch +  "'  . ?movie mov:actor ?link; mov:actor ?Link_To_Actor_Page.  ?Link_To_Actor_Page mov:actor_name ?Names_Of_Actors .  FILTER (?link != ?Link_To_Actor_Page)} GROUP BY ?Names_Of_Actors ?Link_To_Actor_Page  ORDER BY ?total LIMIT 30 ")
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("google.visualization.Sankey")
          .chartWidth(1100)
          .chartHeight(650)
          .draw("searchResults");


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
                }  else {
                  this.setState({ Tooltip: false });
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
                }  else {
                  this.setState({ Tooltip: false });
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
                }  else {
                  this.setState({ Tooltip: false });
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
            }  else {
              this.setState({ Tooltip: false });
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
            var ADG = new window.sgvizler.Query();

      //**?d = directorName
      // ?Actor_Names ?d ... GROUP BY ?Actor_Names ?d == Sankey
          ADG.query(" SELECT  ?Actor_Names (COUNT(?Actor_Names) AS ?Number_Of_Instances)   WHERE {?director<http://data.linkedmdb.org/resource/movie/director_name>  '"+fAOD +"'.?movie  <http://data.linkedmdb.org/resource/movie/director> ?director;<http://data.linkedmdb.org/resource/movie/actor> ?actor.?actor <http://data.linkedmdb.org/resource/movie/actor_name> ?Actor_Names.?director <http://data.linkedmdb.org/resource/movie/director_name>  ?d } GROUP BY ?Actor_Names ORDER BY ?Number_Of_Instances" )
          .endpointURL("http://data.linkedmdb.org/sparql")
          .endpointOutputFormat("jsonp") 
          .chartFunction("google.visualization.ColumnChart")
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
      this.setState({ showButtonGraph: true });
      this.setState({ showButtonTable: true });
      this.setState({ showButtonCharts: false });
      this.setState({ clearButton: true });
      this.setState({ ResultsToolTip: true });

}



  render() {

    return (
      
      <div className="Visualization">
      <Button className="popButton" type="submit" onClick={this.showPopMenu.bind(this)}>  <FaBars /> </Button>
      { this.state.popUpMenu ? 
       <Popover placement="top" id='popover-menu' title="LMDB - VIZ" positionLeft={60} positionTop={10}>
       <div className="Home">
          <p className="paragraphHome">This App's purpose is the <strong>Multi-Perspective Information Visualization of Linked Data.</strong> </p>
          <p className="paragraphHome">In this 0.1a Version you have the option to search for <strong>Movies</strong>, <strong>Directors</strong>,  <strong>Actors</strong>, <strong>All actors who played with certain Actor</strong>, <strong>Film character names</strong>, <strong>Film  Subjects</strong> and <strong>Art Directors</strong>.  The results are based on what you input in the search fields. They also contain links and metadata about your input.  The information is coming direclty from the <strong>Linked Movie Database</strong> <a href="http://data.linkedmdb.org">LMDB</a>. You can choose the type of visualization for the results.(Tables, Graph, etc.)  
          </p>
          
           </div> 
    </Popover>
  : null
  }

      <h1 className="headerSearch">
      You can search for one the following: Movie, Director, Actor, Film Character name, Film Subject or Art Director or Favorite Actors of Director
      </h1>
      <p className = "paragraphSearch">First select the respective category in the dropdown menu below then type in the name in the field next to it. The App will search for your input and visualize the found results. </p>
      <div className="oneSearch"> 
      
      <form className="form-inline" id='formSearch' onSubmit={this.searchSubmit}>
      <FormGroup>
      <FormControl type="text" placeholder="Search " inputRef={(ref) => {this.searchInput = ref}}/>  
      <FormControl componentClass="select" placeholder="select" inputRef={(ref) => {this.searchSelectInput = ref}} >
        <option value="movies">Movies</option>
        <option value="director">Director</option>
        <option value="actor">Actors</option>
        <option value="actorXActor">Actor X Actor</option>
        <option value="filmCharacter">Film Character</option>
        <option value="filmSubject">Film Subject</option>
        <option value="artDirector">Art Director</option>
        <option value="favoriteActor">Favorite Actor of Director</option>

      </FormControl>
      <Button className="SearchBtn" type="submit" bsStyle="default" style={{color:"black", background:"#e6e610"}}>Search <FaSearch /></Button>
      </FormGroup> 
      
      </form>
      { this.state.ResultsToolTip ?
      <Popover placement="top" id='popover-positioned-top' positionLeft={100} positionTop={340}>
         Showing results for  <strong>"{this.searchInput.value }"</strong>
      </Popover>
    
      : null
    }

       </div> {/* end oneSearch  */}
       
        <br /> <br /> <br />
    

        {/* TO DO if no results found*/}

      { this.state.Tooltip ?
      <Popover placement="top" id='popover-positioned-bottom' positionLeft={100} positionTop={340}>
         No results found for <strong>"{this.searchInput.value }"</strong>
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
      { this.state.clearButton ? 
      <Button className="clearButton" type="submit" bsStyle="default" style={{ background:"red", color:"#ccccb3"}} onClick={this.clearButton} > Delete results </Button>
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
