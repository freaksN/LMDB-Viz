//suppress irrelevant warnings
/* eslint-disable react/jsx-no-target-blank, no-useless-concat*/ 

import React, { Component } from 'react';
import {  Button } from 'react-bootstrap';
import {Bar, Line, Doughnut, Pie, Radar, Polar, HorizontalBar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels'; //show numbers on bars, slices etc
import  'chartjs-plugin-zoom'; //zoom In/Out on Charts

// TODO 
//  THIRD VISUALIZATIONS -->> Scorsese and Spielberg + Actor




class advancedVisualizations extends Component { 
    constructor(){
        super();

        


    //Declare States

      //WHOLE LMDB States
        this.state = { showPolarChart: false };
        this.state = { showBarChart: false };
        this.state = { showxChart: false  };

        //Directors States
        this.state = { showDoughnutChartDirectorsDiv: false }
        this.state = { showLineChartDirectorsDiv: false }
        this.state = { BarChartDirectorsDiv: false }


        this.state = { showPieChartDirectorsDiv: false }
       
      

   //Function Bindinds

      //WHOLE LMDB
      this.visualizationsGraphs = this.visualizationsGraphs.bind(this);
      this.visualizationsLineChart = this.visualizationsLineChart.bind(this);
      this.visualizationsHBarChart = this.visualizationsHBarChart.bind(this);

     



      //Directors
      this.visualizationsDoughnutChart = this.visualizationsDoughnutChart.bind(this);
      this.visualizationsPolarChart = this.visualizationsPolarChart.bind(this);
      this.visualizationsRadarChart = this.visualizationsRadarChart.bind(this);

      this.visualizationsPieChart2DirectorsChart = this.visualizationsPieChart2DirectorsChart.bind(this);


    this.get_random_color = this.get_random_color.bind(this);

    }




// ----------------------WHOLE LMDB DATA AVAILABLE-------------------------------------------   





     visualizationsGraphs(event){
        event.preventDefault();


//         this.setState({
//   //add rest of the data OR  only add the most important categories
//  polarChartData:{
//    labels: ['Film_genre', 'Film_costume_designer',  'Content_rating_system', 'Country', 'Director', 'Editor', 'Film', 'Film_art_director', 'Film_casting_director', 'Film_character' , 'Film_company'   ,'Actor', 'Cinematographer', 'Film_location', 'Content_rating', 'Music_contributor', 'Film_subject'],
//    datasets:[
//      {
//        label:['Numbers'],
//        data:[
//          409,
//          353,
//          46,
//          247,
//          2500,
//          2500, 2500, 365, 273, 2500, 338, 2500, 2500, 1315, 107, 2500, 1249
//        ],
//        backgroundColor:[
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color(),
//          this.get_random_color()
//        ],
//      }
//    ]
//  }
// });




     

    
      //   //OLD PIE WITH SGVIZLER
        var pC = new window.sgvizler.Query();
 
      //Movies and links 
        pC.query( " SELECT ?class (count(?instance) AS ?noOfInstances) WHERE{ ?instance a ?class } GROUP BY ?class ORDER BY ?class " )
        .endpointURL("http://data.linkedmdb.org/sparql")
        .endpointOutputFormat("jsonp") 
        .chartFunction("sgvizler.visualization.D3ForceGraph")
        .chartWidth(1100)
        .chartHeight(450)
        .draw("Charts");

        
         this.setState({ showPolarChart: true });
         this.setState({ showBarChart: false });
         this.setState({ showxChart: false });
        
        }


        

        //GET RANDOM COLORS
         get_random_color() {
          for (var i = 0; i < 50; i++) {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            var color = "rgba(" + r + "," + g + "," + b + ", 0.4)";
          
      }
      return color;
    }


        
    visualizationsLineChart(event){
        event.preventDefault();
        

// ----------------------------------------- NEW OLD WAY ------------------------------------


this.setState({
  //add rest of the data OR  only add the most important categories
 lineChartData:{
   labels: ['Film_location', 'Cinematographer',  'Content_rating_system', 'Country', 'Director', 'Film_company', 'Film', 'Film_art_director', 'Film_casting_director', 'Film_character' , 'Film_subject' , 'Film_genre', 'Actor', 'Film_costume_designer', 'Editor', 'Content_rating', 'Music_contributor'],
   
   datasets:[
     {
       label:['Value'],
       data:[
        1315,
         2500,
         46,
         247,
         2500,
         338, 2500, 365, 273, 2500, 1249, 409, 2500, 353, 2500, 107, 2500
       ],
       pointRadius: 8,
       pointHoverRadius: 8,
       borderColor: this.get_random_color(),
       pointHoverBackgroundColor: this.get_random_color(),
       fill: false, 
       backgroundColor:[
         this.get_random_color(),
       ],
     }
   ]
 }
});



// ----------------------------------------------- NEW WAY ------------------------------------
     

//Movies and links 
    //   this.setState({
    //     //add rest of the data OR  only add the most important categories
    //    lineChartData:{
    //      labels: [""],
    //      datasets:[{ 
    //       data: [2500],
    //       label: "Actor",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [46],
    //       label: "Content_rating_system",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [2500],
    //       label: "Cinematographer",
    //       backgroundColor: this.get_random_color()

    //     },
    //     { 
    //       data: [247],
    //       label: "Country",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [2500],
    //       label: "Director",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [365],
    //       label: "Film_art_director",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [273],
    //       label: "Film_casting_directors",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [2500],
    //       label: "Film_character",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [338],
    //       label: "Film_company",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [2500],
    //       label: "Editor ",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [353],
    //       label: "film_costume_designer",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [409],
    //       label: "Film_genre",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [2500],
    //       label: "Film ",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [1315],
    //       label: "Film_location",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [1249],
    //       label: "Film_subject",
    //       backgroundColor: this.get_random_color(),
    //     },
    //     { 
    //       data: [2500],
    //       label: "Music_contributor",
    //       backgroundColor: this.get_random_color()
    //     },
    //     { 
    //       data: [107],
    //       label: "content_rating",
    //       backgroundColor: this.get_random_color()
    //     },
        
    //      ],
         
    //    }
    //  });

        this.setState({showPolarChart: false});
        this.setState({showBarChart: true});
        this.setState({showxChart: false});




// OLD FUNCTIONALITY

//  var bC = new window.sgvizler.Query();
      

//         bC.query( "SELECT ?class (count(?instance) AS ?noOfInstances) WHERE{ ?instance a ?class } GROUP BY ?class ORDER BY ?class " )
//         .endpointURL("http://data.linkedmdb.org/sparql")
//         .endpointOutputFormat("jsonp") 
//         .chartFunction("google.visualization.LineChart")
//         //Possible Charts : Line Chart, Area Chart, Stepped Area Chart, Column Chart, Bar Chart
//         .draw("Charts");
        
//         this.setState({showPolarChart: false});
//         this.setState({showBarChart: true});
//         this.setState({showxChart: false});
        
        }


        visualizationsHBarChart(event){
          event.preventDefault();
 // Ajax calls here
 this.setState({
   //add rest of the data OR  only add the most important categories
  horizontalBarChartDataData:{
    labels: ['Film_location', 'Cinematographer',  'Content_rating_system', 'Country', 'Director', 'Film_company', 'Film', 'Film_art_director', 'Film_casting_director', 'Film_character' , 'Film_subject' , 'Film_genre', 'Actor', 'Film_costume_designer', 'Editor', 'Content_rating', 'Music_contributor' ],
    datasets:[
      {
        label:['Value'],
        data:[
          1315,
         2500,
         46,
         247,
         2500,
         338, 2500, 365, 273, 2500, 1249, 409, 2500, 353, 2500, 107, 2500
        ],
        backgroundColor:[
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color()
        ]
      }
    ]
  }
});
        this.setState({ showxChart:true });
        this.setState({showPolarChart: false});
        this.setState({showBarChart: false});
         


}



// -----------------------------------DIRECTORS   -------------------------------------------   




visualizationsDoughnutChart(event){
  event.preventDefault();
    this.setState({
      DoughnutChartDirectors:{
        labels: ['Harvey Keitel', 'Leonardo DiCaprio', 'Robert De Niro', 'Verna Bloom',   "Catherine Scorsese", "Frank Vincent", "Joe Pesci", "Alec Baldwin", "Nick Nolte",  "Barry Primus" ],
        datasets:[
        {
        label:['Numbers'],
           data:[5, 4, 8 , 4, 3, 3, 3, 2 , 2, 2],
          //data:[ 20, 12.5, 10 , 10, 7.5, 7.5, 7.5, 5 , 5, 5, 5, 5], // Percentange
          backgroundColor:[
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color(),
            this.get_random_color()
          ]    
        }
      ]
    }
});
            //Handle States
           this.setState({ showDoughnutChartDirectorsDiv: true });
           this.setState({ BarChartDirectorsDiv: false });
           this.setState({ showLineChartDirectorsDiv: false });
           
            
}
visualizationsRadarChart(event){
  event.preventDefault();
  this.setState({
    //add rest of the data OR  only add the most important categories
    radarChartData:{
      labels: ['Harvey Keitel', 'Leonardo DiCaprio', 'Robert De Niro', 'Verna Bloom',   "Catherine Scorsese", "Frank Vincent", "Joe Pesci", "Alec Baldwin", "Nick Nolte",  "Barry Primus" ],
      datasets:[
      {
      label:['Numbers'],
         data:[5, 4, 8 , 4, 3, 3, 3, 2 , 2, 2],
        //data:[ 20, 12.5, 10 , 10, 7.5, 7.5, 7.5, 5 , 5, 5, 5, 5], // Percentange
        backgroundColor:[
          this.get_random_color(),
          
        ]    
      }
    ]
  }
});
            // Handle States
           this.setState({ showLineChartDirectorsDiv: true });
           this.setState({ showDoughnutChartDirectorsDiv: false });
           this.setState({ BarChartDirectorsDiv: false });
           
            
}

visualizationsPolarChart(event){
  event.preventDefault();
  this.setState({
    polarChartData:{
      labels: ['Harvey Keitel', 'Leonardo DiCaprio', 'Nick Nolte', 'Catherine Scorsese',   "Verna Bloom", "Frank Vincent", "Joe Pesci", "Alec Baldwin", "Robert De Niro",  "Barry Primus" ],
      datasets:[
      {
      label:['Numbers'],
         data:[5, 4, 2 , 3, 4, 3, 3, 2 , 8, 2],
        //data:[ 20, 12.5, 10 , 10, 7.5, 7.5, 7.5, 5 , 5, 5, 5, 5], // Percentange
        backgroundColor:[
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color(),
          this.get_random_color()
          
        ]    
      }
    ]
  }
});
        //Handle States
         this.setState({ showLineChartDirectorsDiv: false });
         this.setState({ showDoughnutChartDirectorsDiv: false });
         this.setState({ BarChartDirectorsDiv: true });

}




visualizationsPieChart2DirectorsChart(event) {
  event.preventDefault();
  this.setState({
    //add rest of the data OR  only add the most important categories
    pieChartDirectors:{
     labels: ["Harrison Ford", "Laurence Fishburne", "Martin Sheen", "Matt Damon", "Robin Williams", "Teri Garr", "Tom Cruise", "Anthony Hopkins", "Bob Hoskins", "C. Thomas Howell", "Cary Elwes", "Danny Glover", "Roy Scheider" ],
     datasets:[
       {
         label:['Dataset'
        ],
         data:[12, 3, 2, 2, 2, 2, 2, 1, 1 ,1 ,1 ,1 ,1
         ],
         backgroundColor:[
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color(),
           this.get_random_color()
         ]
       }
     ]
   }
  });
  this.setState({ showPieChartDirectorsDiv: true });


}





        

    render() {


        return (

          
// DIVS AND HEADERDS

            <div className="advancedVisualizations">
            <h1 className="advancedVisualizationsHeader">Explore Multiple Visualizations</h1>
            <h3 className="advancedVisualizationsHeader3">By choosing type of visualization with the buttons below you'll be able to see the whole information available at the Linked Data Movie Database <a href="http://data.linkedmdb.org/" target="_blank">LMDB</a>.</h3>
            
          
          
       
    {/* BUTTONS */}
      <Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsGraphs}>Graph </Button>  

       <Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsLineChart}>Line Chart</Button>  

       <Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsHBarChart}>Horizontal Chart</Button>  

       { this.state.showPolarChart ? 
      //  OLD WAY WITH SGVIZLER
         <div className='container' id="Charts">
         </div>

        // <div className='container' id="Charts">
        //  <Polar data={this.state.polarChartData} options={{
        //      plugins: {
        //       datalabels: {
        //          display: true,
        //          color: 'black',
        //          anchor: 'end',
        //          align: 'end'
        //       }},
        //    title:{
        //      display:true,
        //      text:'The whole data available at the LMDB SPARQL-Endpoint',
        //    },
        //    legend:{
        //      display:true,
        //      position:'right'
        //    }
        //  }} width={950} height={500} onElementsClick={elems => console.log(elems[0])

        //  }  />
        //  </div>
        //  : null
        // } 
        : null
       }
        
       { this.state.showBarChart ? 
         <div className='container' id="Charts">
         <Line data={this.state.lineChartData} options={{
           plugins: {
            datalabels: {
              display: true,
              anchor: 'end',
               color: 'black',
               align: 'end',
            }},   
              title:{
             display:true,
             text:'Clicking on the nodes opens the corresponding page in new tab',
             
           },
           pan: {
            // Boolean to enable panning
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow panning in the y direction
            mode: 'y'
        },

        // Container for zoom options
        zoom: {
            // Boolean to enable zooming
            enabled: true,

            // Zooming directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'y',
            
        },      
           legend:{
             display:true,
             position:'right'
           },
           scales: {
             xAxes: [{
               ticks:{
                 autoSkip:false,
                
               }
             }],
             yAxes: [{
               ticks:{
                min:0,
                max: 3500
               }
             }]
           }
         }}  width={950} height={300} getElementsAtEvent={elems => {if(!elems.length) return; 
         var label = elems[0]._index; 
         console.log(label);
         switch (label) {
          // add case for each label/slice
          case 0:
          window.open("http://data.linkedmdb.org/directory/film_location",'_blank');
             break;
          case 1:
          window.open("http://data.linkedmdb.org/directory/cinematographer",'_blank');
             break;
          case 2:
          window.open("http://data.linkedmdb.org/directory/content_rating_system",'_blank');
             break;
          case 3:
          window.open("http://data.linkedmdb.org/directory/country",'_blank');
             break;
          case 4:
          window.open("http://data.linkedmdb.org/directory/director",'_blank');
             break;
          case 5:
          window.open("http://data.linkedmdb.org/directory/film_company",'_blank');
             break;
          case 6:
          window.open("http://data.linkedmdb.org/directory/film",'_blank');
             break;
          case 7:
          window.open("http://data.linkedmdb.org/directory/film_art_director",'_blank');
             break;
          case 8:
          window.open("http://data.linkedmdb.org/directory/film_casting_director",'_blank');
             break;
          case 9:
          window.open("http://data.linkedmdb.org/directory/film_character",'_blank');
             break;
          case 10:
          window.open("http://data.linkedmdb.org/directory/film_subject",'_blank');
             break;
          case 11:
          window.open("http://data.linkedmdb.org/directory/film_genre",'_blank');
             break;
          case 12:
          window.open("http://data.linkedmdb.org/directory/actor",'_blank');
             break;
          case 13:
          window.open("http://data.linkedmdb.org/directory/film_costume_designer",'_blank');
             break;
          case 14:
          window.open("http://data.linkedmdb.org/directory/editor",'_blank');
             break;
          case 15:
          window.open("http://data.linkedmdb.org/directory/content_rating",'_blank');
             break;
          case 16:
          window.open("http://data.linkedmdb.org/directory/music_contributor",'_blank');
             break;
             
             default: 
              return null; 
         }
         } } />
         </div>
         : null
        } 

        {/* Radar */}

       { this.state.showxChart ? 
        <div className='container' id="Charts">
        <HorizontalBar data={this.state.horizontalBarChartDataData} options={{
           plugins: {
            datalabels: {
              display: true,
              anchor: 'end',
               color: 'black',
               align: 'end',
            }},
          title:{
            display:true,
            text:'Clicking on the nodes opens the corresponding page in new tab',
          },
          legend:{
            display:true,
            position:'right'
          },
          scales: {
            xAxes: [{
              ticks:{
                autoSkip:false,
                beginAtZero: true,
                min:0,
                max: 3500
              }
            }],
            yAxes: [{
              ticks:{
              
              }
            }]
          }
         
        }} width={950} height={300} getElementsAtEvent={elems => {if(!elems.length) return; 
          var label = elems[0]._index; 
          console.log(label);
          switch (label) {
            // add case for each label/slice
            case 0:
            window.open("http://data.linkedmdb.org/directory/film_location",'_blank');
               break;
            case 1:
            window.open("http://data.linkedmdb.org/directory/cinematographer",'_blank');
               break;
            case 2:
            window.open("http://data.linkedmdb.org/directory/content_rating_system",'_blank');
               break;
            case 3:
            window.open("http://data.linkedmdb.org/directory/country",'_blank');
               break;
            case 4:
            window.open("http://data.linkedmdb.org/directory/director",'_blank');
               break;
            case 5:
            window.open("http://data.linkedmdb.org/directory/film_company",'_blank');
               break;
            case 6:
            window.open("http://data.linkedmdb.org/directory/film",'_blank');
               break;
            case 7:
            window.open("http://data.linkedmdb.org/directory/film_art_director",'_blank');
               break;
            case 8:
            window.open("http://data.linkedmdb.org/directory/film_casting_director",'_blank');
               break;
            case 9:
            window.open("http://data.linkedmdb.org/directory/film_character",'_blank');
               break;
            case 10:
            window.open("http://data.linkedmdb.org/directory/film_subject",'_blank');
               break;
            case 11:
            window.open("http://data.linkedmdb.org/directory/film_genre",'_blank');
               break;
            case 12:
            window.open("http://data.linkedmdb.org/directory/actor",'_blank');
               break;
            case 13:
            window.open("http://data.linkedmdb.org/directory/film_costume_designer",'_blank');
               break;
            case 14:
            window.open("http://data.linkedmdb.org/directory/editor",'_blank');
               break;
            case 15:
            window.open("http://data.linkedmdb.org/directory/content_rating",'_blank');
               break;
            case 16:
            window.open("http://data.linkedmdb.org/directory/music_contributor",'_blank');
               break;

               default: 
                return null; 
           }
          } } />
        </div>
         : null
        } 

<h3 className="advancedVisualizationsHeader3">By choosing type of visualizations with the buttons below you'll be able to see favorite actors of the Director: <strong>Martin Scorsese</strong></h3>

<Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsDoughnutChart}>Doughnut Chart</Button>  

<Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsRadarChart}>Radar Chart</Button>  

 <Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsPolarChart}>Polar Chart</Button>  

{ this.state.showDoughnutChartDirectorsDiv ? 
    <div className='container' id="Charts2">
     <Doughnut data={this.state.DoughnutChartDirectors} options={{
         plugins: {
          datalabels: {
             display: true,
             color: 'black',
             formatter: function(value, context) {
              return context.chart.data.labels[context.dataIndex] + '\n' + '          ' + value;
          }
          }},
       title:{
         display:true,
         text:"Actors and numbers of times they've played in Martin Scorsese's movies"
       },
       legend:{
         display:true,
         position:'right'
       }
     }}  width={950} height={450}  getElementsAtEvent={elems => {if(!elems.length) return; 
      var label = elems[0]._index; 
      console.log(label);
      switch (label) {
        // add case for each label/slice
        case 0:
        window.open("http://data.linkedmdb.org/page/actor/30061",'_blank');
           break;
        case 1:
        window.open("http://data.linkedmdb.org/resource/actor/29852",'_blank');
           break;
        case 2:
        window.open("http://data.linkedmdb.org/resource/actor/29625",'_blank');
           break;
        case 3:
        window.open("http://data.linkedmdb.org/resource/actor/44404",'_blank');
           break;
        case 4:
        window.open("http://data.linkedmdb.org/resource/actor/43637",'_blank');
           break;
        case 5:
        window.open("http://data.linkedmdb.org/resource/actor/36818",'_blank');
           break;
        case 6:
        window.open("http://data.linkedmdb.org/resource/actor/31450",'_blank');
           break;
        case 7:
        window.open("http://data.linkedmdb.org/resource/actor/30848",'_blank');
           break;
        case 8:
        window.open("http://data.linkedmdb.org/resource/actor/30096",'_blank');
           break;
        case 9:
        window.open("http://data.linkedmdb.org/resource/actor/37991",'_blank');
           break;
  
           default: 
            return null; 
       }
      } }
     />
     </div>
     : null
    } 
{ this.state.showLineChartDirectorsDiv ? 
    <div className='container' id="Charts2">
     <Radar data={this.state.radarChartData} options={{
         plugins: {
          datalabels: {
             display: false
          }},
          

       title:{
         display:true,
         text:"Actors and numbers of times they've played in Martin Scorsese's movies"
       },
       scale: {
        ticks: {
            beginAtZero: true,
            min: 0,
            userCallback: function(label, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                    return label;
                }
            },
        }
    },
       legend:{
         display:true,
         position:'right'
       }
     }} width={950} height={450}  />
     </div>
     : null
    } 

    { this.state.BarChartDirectorsDiv ? 
         <div className='container' id="Charts">
         <Polar data={this.state.polarChartData} options={{
              plugins: {
                datalabels: {
                   display: true,
                   color: 'black',
                   anchor: 'end',
                  
                   formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex] + '\n' 
                }
                }},//remove/show numbers in polar area chart
                scale: {
                     display:true,
                     ticks:{
                        min: 0,
                        max: 10,
                        fontSize: 15
                     }
                },
               
           title:{
             display:true,
             text:"Actors and numbers of times they've played in Martin Scorsese's movies",
           },
           
          legend:{
             display:true,
             position:'right'
           },
           
         }} width={1000} height={480} getElementsAtEvent={elems => {if(!elems.length) return; 
          var label = elems[0]._index; 
          console.log(label);
          switch (label) {
            // add case for each label/slice
            case 0:
            window.open("http://data.linkedmdb.org/page/actor/30061",'_blank');
               break;
            case 1:
            window.open("http://data.linkedmdb.org/resource/actor/29852",'_blank');
               break;
            case 2:
            window.open("http://data.linkedmdb.org/resource/actor/30096",'_blank');
               break;
            case 3:
            window.open("http://data.linkedmdb.org/resource/actor/43637",'_blank');
               break;
            case 4:
            window.open("http://data.linkedmdb.org/resource/actor/44404",'_blank');
               break;
            case 5:
            window.open("http://data.linkedmdb.org/resource/actor/36818",'_blank');
               break;
            case 6:
            window.open("http://data.linkedmdb.org/resource/actor/31450",'_blank');
               break;
            case 7:
            window.open("http://data.linkedmdb.org/resource/actor/30848",'_blank');
               break;
            case 8:
            window.open("http://data.linkedmdb.org/resource/actor/29625",'_blank');
               break;
            case 9:
            window.open("http://data.linkedmdb.org/resource/actor/37991",'_blank');
               break;
      
               default: 
                return null; 
           }
          } }
          />
         </div>
         : null
        }



        <h3 className="advancedVisualizationsHeader3">By choosing type of visualizations with the buttons below you'll be able to see exactly which actors have participated in <strong>Francis Ford Coppola's  AND</strong>  <strong>Steven Spielberg's</strong> movies. </h3>

<Button className="advancedVisualizationsChartButtons" type="submit" bsStyle="info" onClick={this.visualizationsPieChart2DirectorsChart}>Pie Chart</Button>   

{ this.state.showPieChartDirectorsDiv ? 
  <div className='container' id="Charts3">
   <Pie data={this.state.pieChartDirectors} options={{
       plugins: {
        datalabels: {
           display: true,
           anchor: 'end',
           color: 'black',
           formatter: function(value, context) {
            return context.chart.data.labels[context.dataIndex]
        }
        }},
     title:{
       display:true,
       text:"Actors and numbers of times they've played in Francis Ford Coppola's AND Steven Spielberg's movies"
     },
     
     legend:{
       display:true,
       position:'right'
     }
   }} width={1000} height={480}  />
   </div>
   : null
  }

      
      
           </div>  /* end advancedVisualizations */
          
        );
      }
    }
    
    export default advancedVisualizations; 
