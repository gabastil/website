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
    let blurs = ['blur(1.00rem)', 'blur(0.30rem)', 'blur(0.01rem)'];
    let svg, circle;

    for (let i = 0; i < 3; i++) {
        svg = d3.select("svg#" + svgs[i]);
        circle = Circle.generate_circle_attributes(number[i]);

        Circle.draw_circles(svg, circle);
        svg.style('filter', blurs[i]);
    }

    // let title = d3.select("div#content").insert('svg', ':first-child').attr('id', 'zeroeth');
    // Title.title(d3.select(`svg#${svgs[2]}`));
});

class Title {
    constructor(){}
    static title(selection, title = "Glenn Abastillas"){
        selection.append("text")
                 .text(title)
                 .attr("id", "landing-page-title")
                 .attr("x", $(window).width() / 2)
                 .attr("y", $(window).height() / 2);
    }
}

class Circle {

    /**
     * Circle object to hold data for circle svg elements to be drawn on the
     * homepage.
     *
     * @constructor
     * @params {integer} cx - x position position
     * @params {integer} cy - y coordinate position
     * @params {integer} r - radius
     * @params {integer} color - color if applicable. default is black.
     *
     */
    constructor(cx, cy, r, color='#000'){
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.color = color;
    }

    /**
     * Getter for the this.cx variable for a simpler x alias
     * @returns {integer} this.cx coordinate for the x axis
     */
    get x(){
        return this.cx;
    }

    /**
     * Getter for the this.cy variable for a simpler y alias
     * @returns {integer} this.cy coordinate for the y axis
     */
    get y(){
        return this.cy;
    }

    /**
     * Getter for the this.r variable for a simple radius call
     * @returns {integer} this.r radius
     */
    get r(){
        return this.r;
    }

    /**
     * Generate two arrays with x- and y-coordinates. Default n is 100.
     *
     * @param {string} how - Type of rounding function to use. 'ceil' or 'floor'
     * @param {integer} n - Number of (x, y) pairs to generate
     *
     * @returns {array} Array of Circle objects
     */
    static generate_circle_dimensions(n = 100, how = "floor"){
        let window_ = $(window);
        let x_coordinates = Calculator.numbers(window_.width(), how, n);
        let y_coordinates = Calculator.numbers(window_.height(), how, n);
        let radii = Calculator.numbers(window_.width() / 100, how, n);
        let dimensions = [];
        let circle, cx, cy, r;

        while (n > 0) {
            cx = x_coordinates[n - 1];
            cy = y_coordinates[n - 1];
            r = radii[n - 1]

            circle = {cx : cx, cy : cy, r : r};

            dimensions.push(circle);
            n--;
        }
        return dimensions;
    }

    /**
     * Return different arrays of values for different css styles.
     *
     * The available styles to select from are:
     *     - fill
     *     - stroke
     *     - blur
     *
     * @param {string} style - Type of style to return
     * @param {integer} n - Number of style elements to generate
     *
     * @returns {array} Array of style definitions
     *
     */
    static generate_styles(style, n = 100){
        let max_decimal = 16777215; // This is equal to a hex of 0xffffff
        let max_blur = 1;

        style = style.toLowerCase();

        let styles_array = [];
        let style_uses_color = (style == 'fill') | (style == 'stroke');
        let max_value, current_value;

        if (style_uses_color) {
           max_value = max_decimal;
        } else if (style in ['blur']) {
           max_value = max_blur;
        } else {
           alert("Indicate 'fill', 'stroke', or 'blur'");
           return;
        }

        // Generate a random style for each circle in n
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

    /**
     * Return an object with circle dimensions and styels
     *
     * @param {string} how - Type of rounding function to use. 'ceil' or 'floor'
     * @param {integer} n - Size of array to generate
     *
     * @returns {array} Array of Circle objects with attribute data
     */
    static generate_circle_attributes(n, how = 'floor'){
        let dimensions = this.generate_circle_dimensions(n, how);
        let fills = this.generate_styles('fill', n);
        let strokes = this.generate_styles('stroke', n);

        while (n > 0){
           dimensions[n - 1]['fill'] = fills[n - 1];
           dimensions[n - 1]['stroke'] = strokes[n - 1];
           n--;
        }
        return dimensions;
    }


   /**
    * Draw circles onto the specified svg canvas
    *
    * Parameters
    * ----------
    * @param {selection} svg - SVG object
    * @param {object} data - Object with circle attributes
    *
    */
    static draw_circles(svg, data){
       svg.selectAll('circle')
           .data(data)
           .enter()
           .append('circle')
           .attr('cx', this.x)
           .attr('cy', this.y)
           .attr('fill', '#666')
           // .attr('stroke', get_stroke)
           .attr('stroke-width', 1)
           .transition()
           .duration(1000)
           .attr('r', get_r)
           ;
    }

    static x(d, i){
        return d.cx;
    }

    static y(d, i){
        return d.cy;
    }
}

class Calculator {

    /**
     * Generate an array of random numbers. Default array size is 100.
     *
     * @param {integer} max - Maximum size of each value in the array.
     * @param {string} how - Type of rounding function to use. 'ceil' or 'floor'
     * @param {integer} n - Size of array to generate
     */
    static numbers(max, how = "floor", n = 100){
        let array = [];
        let value;

        how = how.toLowerCase();

        while (n > 0){
            value = Math.random() * max;
            // Round the random number based on the function indicated in 'how'
            if (how === "floor") {
                value = Math.floor(value);
            } else if (how === "ceil") {
                value = Math.ceil(value);
            } else {
                let error = "Indicate 'floor' or 'ceil' for 'how' parameter";
                console.error(error);
                alert(error);
                break;
            }
            array.push(value);
            n--;
        }
        return array;
    }

    /**
     * Generate an array of random numbers. Default array size is 100.
     *
     * @param {integer} max - Maximum size of each value in the array.
     * @param {string} how - Type of rounding function to use. 'ceil' or 'floor'
     * @param {integer} n - Size of array to generate
     */
    static jitter(event){
        let shape = $(this);
        let mouse_xy = {x : event.pageX, y : event.pageY};
        let shape_xy = {x : shape.attr('cx'), y : shape.attr('cy')};

        if (shape_xy.x < mouse_xy.x) {
            shape.attr('x', shape_xy.x + 10).transition().duration(1000);
        }
    }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Plot Function Definitions for D3 data
 *
 * D3 function definitions for different plots
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - -
 */

    // DEPRECATE
 // function generate_circle_dimensions(n = 100, how = "floor"){
 //     let window_ = $(window);
 //     let x_coordinates = Calculator.numbers(window_.width(), how, n);
 //     let y_coordinates = Calculator.numbers(window_.height(), how, n);
 //     let radii = Calculator.numbers(window_.width() / 100, how, n);

 //     let dimensions = [];
 //     let circle;

 //     while (n > 0) {
 //        circle = {
 //                  cx : x_coordinates[n - 1],
 //                  cy : y_coordinates[n - 1],
 //                  r : radii[n - 1],
 //                 };

 //        dimensions.push(circle);
 //        n--;
 //     }

 //     return dimensions;
 // }

// function generate_styles(style, n = 100){
//     /* Return different arrays of values for different css styles.
//      *
//      * Parameters
//      * ----------
//      *      style (string) : Type of style to return
//      *      n (integer) : Number of style elements to generate
//      *
//      * Notes
//      * -----
//      *      The available styles to select from are:
//      *          - fill
//      *          - stroke
//      *          - blur
//      *
//      */
//      let max_decimal = 16777215; // This is equal to a hex of 0xffffff
//      let max_blur = 1;

//      style = style.toLowerCase();

//      let styles_array = [];
//      let style_uses_color = style == 'fill' | style == 'stroke';

//      let max_value, current_value;


//      if (style_uses_color) {
//         max_value = max_decimal;
//      } else if (style in ['blur']) {
//         max_value = max_blur;
//      } else {
//         alert("Indicate 'fill', 'stroke', or 'blur'");
//         return;
//      }

//      while (n > 0) {
//         current_value = Math.random() * max_value;
//         current_value = Math.floor(current_value);

//         if (style_uses_color) {
//             current_value = "#" + current_value.toString(16);
//         }

//         styles_array.push(current_value);
//         n--;
//      }

//      return styles_array;
// }

// function generate_circle_attributes(n, how = 'floor'){
//     /* Return an object with circle dimensions and styels
//      *
//      * Parameters
//      * ----------
//      *      how (string) : Type of rounding function to use. 'ceil' or 'floor'
//      *      n (integer) : Size of array to generate
//      *
//      * Notes
//      * -----
//      *
//      */

//      let dimensions = Circle.generate_circle_dimensions(n, how);
//      let fills = Circle.generate_styles('fill', n);
//      let strokes = Circle.generate_styles('stroke', n);

//      while (n > 0){
//         dimensions[n - 1]['fill'] = fills[n - 1];
//         dimensions[n - 1]['stroke'] = strokes[n - 1];
//         n--;
//      }

//      return dimensions;
// }



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

