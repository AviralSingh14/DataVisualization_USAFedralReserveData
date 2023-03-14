import React from 'react';
import './style.css'
import * as d3 from 'd3';
function App() {
  fetch('http://api.worldbank.org/v2/countries/IND/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json')
  .then(response => response.json())
  .then(data => {
    var marginTop = 10;
    var marginBottom = 25;
    var marginLeft = 60;
    var marginRight = 15;
    var width = 700 - marginLeft;
    var height = 400 - marginBottom;
    var maxDate = new Date(data.Date);
    var minDate = new Date(data.Date);

    var ScaleY = d3.scale.linear()
    // document.getElementById('chart').innerHTML = JSON.stringify(data);  
  })

  return (
    <div id = "container">
      <div id='title'>India's GDP Growth</div>
      <div id='graph-container'>
        <div id='chart'></div>
      </div>
    </div>
  );
}

export default App;
