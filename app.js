// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 1000
var svgHeight = 800
var totMargin = {top: 40, right: 40, bottom: 40, left: 40};
var width = svgWidth - totMargin.left - totMargin.right;
var height = svgHeight - totMargin.top - totMargin.bottom;



// x Axis - Census data - Uninsured by State
var xLinearScale = d3.scaleLinear().range([0, width]);

// y Axis - Behavioral Risks
var yLinearScale = d3.scaleLinear().range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);
xMap = function(d) { return xLinearScale(xValue(d));}
yMap = function(d) { return yLinearScale(yValue(d));}
var xValue = function(d) { return d.uninsured;} // data -> value
var yValue = function(d) { return d.poorGeneralHealth;} // data -> value


// add the graph
var svg = d3.select("#analysis").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
  .append("g")
    .attr("transform", "translate(" + totMargin.left + "," + totMargin.top + ")");

// add the tooltip
var tooltip = d3.select("div").append("div")
	.attr("class", "t-tip")
    .style("opacity", 0);

// load data
d3.csv("data.csv", function(error, data) {

  // cast to integer
  data.forEach(function(d) {
    d.uninsured = +d.uninsured;
    d.poorGeneralHealth = +d.poorGeneralHealth;
    //console.log(d);
  });
	
	xLinearScale.domain([0,
		d3.max(data, function(data) {
			return data.uninsured;})+1])
			
	yLinearScale.domain([0,
		d3.max(data, function(data) {
			return data.poorGeneralHealth;})+1])
	
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(bottomAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Percent Uninsured");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(leftAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .style("text-anchor", "end")
      .text("Percent with Poor General Health");

  // plot circles
  var cirStates = svg.selectAll(".state")
      .data(data)
    .enter().append("circle")
	
	cirStates
      .attr("class", "state")
      .attr("r", 12)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .5);
          tooltip.html(d.state + "<br/> (" + xValue(d)
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      })
	  append("g")
		.append("text")
			.attr("x", xMap
			)	
			.attr("y", yMap
			)
			.style("fill","white")
			.attr("class","abbr")
			.text(function(d){
					return d.abbr;
			});
})
