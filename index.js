// Import necessary functions and objects from the 'd3' library.
import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  format
} from 'd3';

// Select the 'svg' element from the HTML document.
const svg = select('svg');

// Retrieve the width and height attributes of the 'svg' element.
const width = +svg.attr('width');
const height = +svg.attr('height');

// Define a function called 'render' that takes 'data' as a parameter.
const render = data => {
  // Define title and labels for the chart.
  const title = 'Cars: Horsepower vs. Weight';
  const xValue = d => d.horsepower;
  const xAxisLabel = 'Horsepower';
  const yValue = d => d.weight;
  const circleRadius = 10;
  const yAxisLabel = 'Weight';

  // Define margins and inner dimensions for the chart.
  const margin = { top: 60, right: 40, bottom: 88, left: 150 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create x and y scales for mapping data to the chart's dimensions.
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  // Create a 'g' element within the 'svg' element and apply translation.
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Create x and y axes, and format their appearance.
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

  // Append the y-axis to the 'g' element and remove its domain line.
  const yAxisG = g.append('g').call(yAxis);
  yAxisG.selectAll('.domain').remove();

  // Add a label for the y-axis and rotate it for vertical alignment.
  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -93)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

  // Append the x-axis to the 'g' element and remove its domain line.
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  xAxisG.select('.domain').remove();

  // Add a label for the x-axis.
  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 75)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

  // Create circles for each data point and position them using scales.
  g.selectAll('circle').data(data)
    .enter().append('circle')
      .attr('cy', d => yScale(yValue(d)))
      .attr('cx', d => xScale(xValue(d)))
      .attr('r', circleRadius);

  // Add a title to the chart.
  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title);
};

// Load data from a CSV file and call the 'render' function when done.
csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
  .then(data => {
    // Convert data values to numeric types.
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;  
    });
    // Call the 'render' function with the loaded data.
    render(data);
  });
