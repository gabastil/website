/* Filename: dataviz.js
 * Author: Glenn Abastillas
 * Created: February 27, 2020
 *
 * JavaScript for D3 animation on splashpage for
 * www.glennabastillas.com
 *
 * This script loads data and plots it on the dataviz.html page.
 *
 *
 */

$(document).ready(function(){

    var input = $('input[name="file"]');
    let input_file;

    input.on('change', function(){
        input_file = readInputFile(input[0]);
        console.log("Can read " + input_file);
    });


});

