/* Filename: animation.js
 * Author: Glenn Abastillas
 * Created: February 20, 2020
 *
 * JavaScript for D3 animation on splashpage for
 * www.glennabastillas.com
 *
 * This script will generate a random sequence of dots for the splash page.
 *
 *
 */

$(document).ready(function(){

    /* Draw circles all over the splash screen */
    let number = [100, 50, 10];
    let svgs = ['third', 'second', 'first'];
    let blurs = ['blur(1.00rem)', 'blur(0.30rem)', 'blur(0.05rem)'];
    let svg, circle;

    for (let i = 0; i < 3; i++) {
        svg = d3.select("svg#" + svgs[i]);
        circle = generate_circle_attributes(number[i]);

        draw_circles(svg, circle);
        svg.style('filter', blurs[i]);
    }

    /* Enable hover action */
    // $("svg circle").hover(function(){
    //     $(this).animate(
    //     {
    //         cx : $(this).attr('cx'),
    //         cy : parseInt($(this).attr('cy')) + 10,
    //     })
    // });

});

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Plot Function Definitions for D3 data
 *
 * D3 function definitions for different plots
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

 function generate_numbers(max, how = "floor", n = 100){
    /* Generate an array of random numbers. Default array size is 100.
     *
     * Parameters
     * ----------
     *      max (integer) : Maximum size of each value in the array.
     *      how (string) : Type of rounding function to use. 'ceil' or 'floor'
     *      n (integer) : Size of array to generate
     */
     let array = [];
     let floor = "floor";
     let ceil = "ceil";
     let value;

     how = how.toLowerCase();

     while (n > 0){

        value = Math.random() * max;

        // Round the random number based on the function indicated in 'how'
        if (how === floor) {
            value = Math.floor(value);
        } else if (how === ceil) {
            value = Math.ceil(value);
        } else {
            alert("`generate_random_number` function requires " +
                   "you to indicate 'floor' or 'ceil' for the " +
                   "'how' argument.");
            break;
        }

        array.push(value);

        n -= 1;
     }

     return array;
 }

 function generate_circle_dimensions(n = 100, how = "floor"){
    /* Generate two arrays with x- and y-coordinates. Default n is 100.
     *
     * Parameters
     * ----------
     *      how (string) : Type of rounding function to use. 'ceil' or 'floor'
     *      n (integer) : Number of (x, y) pairs to generate
     */
     let window_ = $(window);
     let x_coordinates = generate_numbers(window_.width(), how, n);
     let y_coordinates = generate_numbers(window_.height(), how, n);
     let radii = generate_numbers(window_.width() / 100, how, n);

     let dimensions = [];
     let circle;

     while (n > 0) {
        circle = {
                  cx : x_coordinates[n - 1],
                  cy : y_coordinates[n - 1],
                  r : radii[n - 1],
                 };

        dimensions.push(circle);
        n--;
     }

     return dimensions;
 }

function generate_styles(style, n = 100){
    /* Return different arrays of values for different css styles.
     *
     * Parameters
     * ----------
     *      style (string) : Type of style to return
     *      n (integer) : Number of style elements to generate
     *
     * Notes
     * -----
     *      The available styles to select from are:
     *          - fill
     *          - stroke
     *          - blur
     *
     */
     let max_decimal = 16777215; // This is equal to a hex of 0xffffff
     let max_blur = 1;

     style = style.toLowerCase();

     let styles_array = [];
     let style_uses_color = style == 'fill' | style == 'stroke';

     let max_value, current_value;


     if (style_uses_color) {
        max_value = max_decimal;
     } else if (style in ['blur']) {
        max_value = max_blur;
     } else {
        alert("Indicate 'fill', 'stroke', or 'blur'");
        return;
     }

     while (n > 0) {
        current_value = Math.random() * max_value;
        current_value = Math.floor(current_value);

        if (style_uses_color) {
            current_value = "#" + current_value.toString(16);
        }

        styles_array.push(current_value);
        n--;
     }

     return styles_array;
}

function generate_circle_attributes(n, how = 'floor'){
    /* Return an object with circle dimensions and styels
     *
     * Parameters
     * ----------
     *      how (string) : Type of rounding function to use. 'ceil' or 'floor'
     *      n (integer) : Size of array to generate
     *
     * Notes
     * -----
     *
     */

     let dimensions = generate_circle_dimensions(n, how);
     let fills = generate_styles('fill', n);
     let strokes = generate_styles('stroke', n);

     while (n > 0){
        dimensions[n - 1]['fill'] = fills[n - 1];
        dimensions[n - 1]['stroke'] = strokes[n - 1];
        n--;
     }

     return dimensions;
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Functions to draw shapes onto the svg frames
 *
 * D3 functions to draw different shapes
 * - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

 function draw_circles(svg, data){
    /* Draw circles onto the specified svg canvas
     *
     * Parameters
     * ----------
     *      svg (d3 selection) : SVG object
     *      data (object) : Object with circle attributes
     *
     */
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', get_cx)
        .attr('cy', get_cy)
        .attr('fill', '#666')
        // .attr('stroke', get_stroke)
        .attr('stroke-width', 1)
        .transition()
        .duration(1000)
        .attr('r', get_r)
        ;

 }

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Function definitions for retrieving shape attributes
 *
 * D3 function definitions for different shapes
 * - - - - - - - - - - - - - - - - - - - - - - - - - -*/

// Circle functions
 function get_cx(obj){return obj.cx;}
 function get_cy(obj){return obj.cy;}
 function get_r(obj){return obj.r;}

 // Style functions
 function get_fill(obj){return obj.fill;}
 function get_stroke(obj){return obj.stroke;}


/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Function definitions for animating drawn shapes
 * - - - - - - - - - - - - - - - - - - - - - - - - - -*/

 function jitter(event){
    let shape = $(this);
    let mouse_xy = {x : event.pageX, y : event.pageY};
    let shape_xy = {x : shape.attr('cx'), y : shape.attr('cy')};

    if (shape_xy.x < mouse_xy.x) {
        shape.attr('x', shape_xy.x + 10).transition().duration(1000);
    }

 }
