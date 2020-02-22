/* Filename: animation.js
 * Author: Glenn Abastillas
 * Created: February 20, 2020
 *
 * JavaScript for D3 animation on splashpage for
 * www.glennabastillas.com
 *
 */


// Data URLs from data.gov and kaggle.com
const datasets = {
                  precipitation : "https://www1.ncdc.noaa.gov/pub/data/cdo/samples/PRECIP_HLY_sample_csv.csv", // Valid link but only 3 samples
                  // poverty : "http://api.worldbank.org/v2/en/indicator/SI.POV.DDAY?downloadformat=csv",
                  // adult : "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
                  // drug : "https://data.ct.gov/api/views/rybz-nyjw/rows.csv?accessType=DOWNLOAD",
                  // child : "https://data.ok.gov/sites/default/files/res_child_mental_health_treatment_-_line_chart_fkvh-8k7q.csv",
                  fertility : "https://api.worldbank.org/v2/en/country/all/indicator/SP.DYN.TFRT.Q2?format=json&per_page=20000&source=39"
                 }


// const data = d3.json(datasets['fertility']);

// data.then(processFertilityData);

// var data_ = data.then(
//     function(d){
//         console.log(d);
//         alert(d.columns);
//         alert("Number of rows " + d.length);
//         return d[0];
//     },
//     function(){
//         alert("No data");
//     }
//     );

const $DATA = [
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

    $("rect").hover(function() {
        $(this).attr("old_fill", $(this).attr("fill"));
        $(this).attr("fill", "red");
    }, function() {
        $(this).attr("fill", $(this).attr("old_fill"));
    });

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

    // svg
    //   .append("circle")
    //   .attr("cx", 300)
    //   .attr("cy", 200)
    //   .attr("r", 100)
    //   .attr("fill", "none")
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 10)
    //   .transition()
    //   .duration(1000)
    //   .attr("cx", 400)
    //   .attr("cy", 400);


    // Test adding shapes to the document
    svg
        .selectAll("circle")
        .data($DATA)
        .enter()
        .append('circle')
        .attr("cx", function(d){return d.x})
        .attr("cy", function(d){return d.y})
        .attr("r", function(d){return d.z})
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("stroke-width", 3);


    let data = [100, 150, 200, 211, 311, 342, 410, 691, 789];
    let colors = ['red', 'blue', 'green', 'cornflowerblue', 'orange', 'black', 'white'];

    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x", 0)
       .attr("y", function(d){return data.indexOf(d) * Math.sqrt(d)})
       .attr("height", function(d){return Math.sqrt(d)})
       .transition()
       .duration(5000)
       .attr("width", function(d){return d})
       .style("filter", "blur(0)")
       .attr("fill", function(d){return colors[(d % colors.length)]})
       .text(function(d){return d});



    // svg
    //   .transition()
    //   .duration(10000)
    //   .style("filter", "blur(0)");

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

 function processFertilityData(d){
    /* Preprocess fertility data from the World Bank to generate a single data set
     * Link: https://api.worldbank.org/v2/en/country/all/indicator/SP.DYN.TFRT.Q2?format=json&per_page=20000&source=39
     *
     * Parameters
     * ----------
     *      d (Array) : Lenght of 2, the second entry contains all the data
     *
     * Notes
     * -----
     *      The input data is a nested dictionary of dictionaries with a lot of data.
     *      The most relevant data elements to collect are 'date', 'value', 'country', and 'indicator'
     */

     let data = d[1]; // All data stored in second array element

     alert(data);


 };