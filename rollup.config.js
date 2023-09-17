// Import the Rollup plugin 'buble'
const buble = require('@rollup/plugin-buble');

// Export Rollup configuration object
export default {
  // Specify the input file
  input: 'index.js',

  // Declare external dependencies that should not be bundled
  external: [
    "d3", "d3-array", "d3-axis", "d3-brush", "d3-chord", "d3-collection", 
    "d3-color", "d3-contour", "d3-dispatch", "d3-drag", "d3-dsv", 
    "d3-ease", "d3-fetch", "d3-force", "d3-format", "d3-geo", 
    "d3-hierarchy", "d3-interpolate", "d3-path", "d3-polygon", 
    "d3-quadtree", "d3-random", "d3-scale", "d3-scale-chromatic", 
    "d3-selection", "d3-shape", "d3-tile", "d3-time", "d3-time-format", 
    "d3-timer", "d3-transition", "d3-voronoi", "d3-zoom", 
    "react", "react-dom", "react-dropdown-browser", "react-dropdown", 
    "three", "vega", "vega-embed", "vega-lite", "vega-lite-api", 
    "vega-tooltip", "vega-themes", "vizhub-vega-lite-config", "semiotic", "viz.js"
  ],

  // Define the output configuration
  output: {
    file: 'bundle.js', // Specify the output file
    format: 'iife',   // Use the IIFE (Immediately Invoked Function Expression) format
    sourcemap: true,   // Generate source maps for debugging
    globals: {         // Define global variables for external dependencies
      "d3": "d3", "d3-array": "d3", "d3-axis": "d3", "d3-brush": "d3",
      "d3-chord": "d3", "d3-collection": "d3", "d3-color": "d3", 
      "d3-contour": "d3", "d3-dispatch": "d3", "d3-drag": "d3",
      "d3-dsv": "d3", "d3-ease": "d3", "d3-fetch": "d3",
      "d3-force": "d3", "d3-format": "d3", "d3-geo": "d3",
      "d3-hierarchy": "d3", "d3-interpolate": "d3", "d3-path": "d3",
      "d3-polygon": "d3", "d3-quadtree": "d3", "d3-random": "d3",
      "d3-scale": "d3", "d3-scale-chromatic": "d3", "d3-selection": "d3",
      "d3-shape": "d3", "d3-tile": "d3", "d3-time": "d3",
      "d3-time-format": "d3", "d3-timer": "d3", "d3-transition": "d3",
      "d3-voronoi": "d3", "d3-zoom": "d3", "react": "React",
      "react-dom": "ReactDOM", "react-dropdown-browser": "ReactDropdown",
      "react-dropdown": "ReactDropdown", "three": "THREE",
      "vega": "vega", "vega-embed": "vegaEmbed", "vega-lite": "vegaLite",
      "vega-lite-api": "vl", "vega-tooltip": "vegaTooltip",
      "vega-themes": "vegaThemes", "vizhub-vega-lite-config": "vizhubVegaLiteConfig",
      "semiotic": "Semiotic", "viz.js": "Viz"
    }
  },

  // Use the 'buble' plugin to transpile the code
  plugins: [buble()]
};
