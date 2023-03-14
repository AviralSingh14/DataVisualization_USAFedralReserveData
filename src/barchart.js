import * as d3 from 'd3';
function BarChart() {
  fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
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

    var scaleY = d3.scale.linear().domain([0, d3.max(data.data.map(function(d){
      return d[1]
    }))]).range([0, width - marginTop])

    var scaleX = d3.scale.ordinal().domain(d3.range(0, data.data.length)).rangeBands([0, width - marginRight])

    var axisY = d3.svg.axis().scale(d3.scale.linear().domain([d3.max(data.data.map(function(d){
      return d[1]
    })), 0 ]).range([0, height - marginTop])).orient("left").ticks(11)
    // document.getElementById('chart').innerHTML = JSON.stringify(data);  

    var axisX = d3.svg.axis().scale(d3.time.scale().domain([minDate, maxDate]).range([0, width -marginRight ])).orient('bottom').ticks(d3.time.years, 5);

    var bar = d3.select('.chart')
    .append('svg')  
    .attr('width', width + marginLeft)
    .attr('height', height + marginBottom)
    .style({'background': 'none', 'position' : 'relative'})

    var toolTip = d3.select('.chart').
    append('div').attr('class', 'tooltip').
    attr('style','visibility: hidden;')

    bar.append('g').
    append('text')
    .attr('x', marginLeft * 2)
    .attr('y', marginBottom)
    .attr("style","font-family:sans;font-size: 29px;font-weight:100; stroke:#444;")
    .text(data.source_name)
  
    bar.append('g')
    .attr('transform', 'translate('+(marginLeft - 1)+', '+marginTop+')')
    .call(axisY)
    .selectAll('line')
    .style({ 'stroke': '#000', 'stroke-width': '0.1'})
    .selectAll('text').attr("style","font-size: 12px;")

    bar.append('g')
    .attr('transform', 'translate('+(marginLeft - 1)+', '+(height + 1)+')')
    .call(axisX)
    .selectAll('line')
    .style({ 'stroke': '#000', 'stroke-width': '0.1'})
    .selectAll('text').style('transform','rotate(-90deg)')
    .attr("style","font-size: 12px;")
  
    bar.append('g')
    .attr('transform', 'translate(' + marginLeft + ',0)')
    .selectAll('rect')
    .data(data.data)
    .enter()
    .append('rect')
    .style({'fill' : 'rgba(189, 255, 223, 0.74)'}).attr('width', scaleX.rangeBand())
    .attr('height', function(d) { return scaleY(d[1]) })
    .attr('x', function(d, i) { return i * scaleX.rangeBand()})
    .attr('y', function(d) { return height - scaleY(d[1]) })
    .on('mouseover', function(d) {
      var posX = d3.event.pageX;
      var posY = d3.event.pageY;
      toolTip
      .attr('style','left:'+ posX +'px;top:'+ posY +'px; visibility: visible;')
      .html(d[0] + '<br /><strong>'+d[1]+'</strong>')
      d3.select(this).style('fill', '#BDFFF6');
    })
    .on('mouseout', function(d) {
      d3.select(this).style('fill', 'rgba(189, 255, 223, 0.74)');
      toolTip.attr('style', 'visibility: hidden;');
    })
  });
}

export default BarChart;