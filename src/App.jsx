import React from 'react';
import './style.css'
import BarChart from './barchart';
function App(){
  BarChart()
  return (
    <div id = 'container'>
      <div id='title'>India's GDP Growth</div>
      <div className='container'>
        <div className='chart'></div>
      </div>
    </div>
  );
}
export default App;
