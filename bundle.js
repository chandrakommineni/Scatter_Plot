(function (d3) {
  'use strict';

  // Select the SVG element from the DOM
  const svg = d3.select('svg');

  // Get the width and height of the SVG element
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  // Define a function called 'render' that will create the data visualization
  const render = data => {
    // Title for the chart
    const title = 'Cars: Horsepower vs. Weight';

    // Function to extract the 'horsepower' value from data
    const xValue = d => d.horsepower;
    // Label for the x-axis
    const xAxisLabel = 'Horsepower';

    // Function to extract the 'weight' value from data
    const yValue = d => d.weight;
    // Radius of the data points (circles)
    const circleRadius = 10;
    // Label for the y-axis
    const yAxisLabel = 'Weight';

    // Define margins for the chart
    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a linear scale for the x-axis
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    // Create a linear scale for the y-axis
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    // Create a group element and set its position within the SVG
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create the x-axis with ticks and labels
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    // Create the y-axis with ticks and labels
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);

    // Create a group element for the y-axis and remove the domain line
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    // Add a label for the y-axis
    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -93)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    // Create a group element for the x-axis and remove the domain line
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    xAxisG.select('.domain').remove();

    // Add a label for the x-axis
    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 75)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    // Create circles for each data point and set their positions and radii
    g.selectAll('circle').data(data)
      .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);

    // Add a title to the chart
    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title);
  };

  // Load data from a CSV file and execute the 'render' function
  d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
    .then(data => {
      // Convert data values to numbers
      data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;  
      });
      // Call the 'render' function with the loaded data
      render(data);
    });

}(d3));
