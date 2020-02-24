/* Filename: animation.js
 * Author: Glenn Abastillas
 * Created: February 20, 2020
 *
 * JavaScript for D3 animation on splashpage for
 * www.glennabastillas.com
 *
 */


// Data URLs
var precipitation = "https://www1.ncdc.noaa.gov/" +
                    "pub/data/cdo/samples/" +
                    "PRECIP_HLY_sample_csv.csv";

// var data = d3.csv(precipitation);


/*
 * SANDBOX FOR D3
 *
 *
 *
 *
 */

// var svg = d3.select("svg");

d3.select("body")
.append("svg");

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Plot Function Definitions for D3 data
 *
 * D3 function definitions for different plots
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

 function scatterplot(d){
    /* Function to create a scatterplot for input data
     *
     * Parameters
     * ----------
     *      d (JSON): Input data
     */
 }

 function heatmap(d){
    /* Function to create a heatmap for input data
     *
     * Parameters
     * ----------
     *      d (JSON): Input data
     */
 }

 function histogram(d){
    /* Function to create a histogram for input data
     *
     * Parameters
     * ----------
     *      d (JSON): Input data
     */
 }