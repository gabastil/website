/* Filename: animation.js
 * Author: Glenn Abastillas
 * Created: February 20, 2020
 *
 * JavaScript for D3 animation on splashpage for
 * www.glennabastillas.com
 *
 */


// Data URLs from data.gov and kaggle.com
const data = {
              precipitation : "https://www1.ncdc.noaa.gov/pub/data/cdo/samples/PRECIP_HLY_sample_csv.csv",
              poverty : "https://www.kaggle.com/ophi/mpi#MPI_national.csv",
             }


const $_TESTDATA = [
{
     x : "20%",
     y : 100,
     z : 13,
 },
{
     x : '40%',
     y : 870,
     z : 90,
 },
{
     x : 400,
     y : 120,
     z : 5,
 },
{
     x : 700,
     y : 340,
     z : 5,
 }
];


/*
 * SANDBOX FOR D3
 */

$(document).ready(function(){
    sandbox();

})

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Plot Function Definitions for D3 data
 *
 * D3 function definitions for different plots
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

 function sandbox(){

    let svg = d3.select("svg");

    svg
      .append("text")
      .attr("x", 500)
      .attr("y", 500)
      .text("Hello");

    svg
      .append("circle")
      .attr("cx", 300)
      .attr("cy", 200)
      .attr("r", 100)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 10)
      .transition()
      .duration(1000)
      .attr("cx", 400)
      .attr("cy", 400);


    // Test adding shapes to the document
    svg
        .selectAll("circle")
        .data($_TESTDATA)
        .enter()
        .append('circle')
        .attr("cx", function(d){return d.x})
        .attr("cy", function(d){return d.y})
        .attr("r", function(d){return d.z})
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 3);



    svg
      .transition()
      .duration(10000)
      .style("filter", "blur(0)");

 }

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