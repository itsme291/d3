var width = 960;
var height = 660;

var chartMargin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
};

var axisText = 50;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData) {
  healthData.forEach(function(d){
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
  });
 var xScale = d3
    .scaleLinear()
    .domain(d3.extent(healthData.map(d => d.poverty)))
    .range([axisText + chartMargin.left, width - chartMargin.right]);

  var yScale = d3
    .scaleLinear()
    .domain(d3.extent(healthData.map(d => d.healthcare)))
    .range([height - axisText - chartMargin.top, 0]);

  var xAxis = d3.axisBottom(xScale).ticks(20);
  var yAxis = d3.axisLeft(yScale).ticks(20);

  chartGroup
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (height - chartMargin.top - axisText) + ")");
  
  chartGroup
    .append("g")
    .call(yAxis)
    .attr("transform", "translate(" + (chartMargin.left + axisText) + ", 0)");

  var labels = svg.selectAll("circles").data(healthData).enter();

  labels
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", 15)
    .attr("class", d => "stateCircle " + d.abbr);

  labels
    .append("text")
    .text(d => d.abbr)
    .attr("dx", d => xScale(d.poverty))
    .attr("dy", d => yScale(d.healthcare))
    .attr("font-size", 8)
    .attr("class", "stateText")
});

chartGroup.append("text")
  .text("In Poverty (%)")
  .attr("dx", width/2)
  .attr("dy", height - (chartMargin.bottom)*2);

chartGroup.append("text")
  .text("Lacks healthcare (%)")
  // .attr("transform", "translate(" - width/2 + ", " + 0 + ")")
  .attr("transform", "rotate(-90)")
  .attr("dx", -width/4)
  .attr("dy", 0)
  .style("text-anchor", "middle");