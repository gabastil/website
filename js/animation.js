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

    let number = [75, 30, 20];
    let layers = ['third', 'second', 'first'];
    let blurs = ['blur(1.00rem)', 'blur(0.30rem)', 'blur(0.10rem)'];
    let svg, circle, circles = [], svgs = [];

    /* Draw circles all over the splash screen */
    for (let i = 0; i < 3; i++) {
        svg = d3.select("svg#" + layers[i]);
        circle = generate_circle_attributes(number[i]);

        draw_circles(svg, circle);
        svg.style('filter', blurs[i]);
        circles.push(circle);
        svgs.push(svg);
    }

    /* Draw the lines that connect circles all over the splash screen */
    let connections = generate_circle_connections(circles.flat());
    draw_circle_connections(connections, circles, svgs);

    alert({x : 9, y : 5};
    // alert(distance({x : 5, y : 10}, {x : 9, y : 5}));

});


/* - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Function definitions for retrieving shape attributes
 *
 * D3 function definitions for different shapes
 * - - - - - - - - - - - - - - - - - - - - - - - - - -*/

 // Circle functions
 function get_x(obj){return obj.x;}
 function get_y(obj){return obj.y;}
 function get_cy(obj){return obj.cy;}
 function get_cy(obj){return obj.cy;}
 function get_r(obj){return obj.r;}

 // Style functions
 function get_fill(obj){return obj.fill;}
 function get_stroke(obj){return obj.stroke;}

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
     let max_decimal = 16777215;    // This is equal to a hex of 0xffffff
     let max_blur = 1;

     style = style.toLowerCase();

     let styles_array = [];

     let style_uses_color = ((style == 'fill') | 
                             (style == 'stroke'));

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

 function generate_circle_connections(circles, max_size = 20){
    /* Return a list of circles that are close enough to warrant a connection
     *
     * Parameters
     * ----------
     *      circles (array) : List of circle objects to join
     *      max_size (integer) : The number of segments the width of the
     *                                 screen should be divided into.
     *
     * Notes
     * -----
     *      A random, even number of circles are chosen to be connected.
     *      The euclidean distance between each circle is calculated.
     */

    let connections = pair(circles.flat());
    let maximum_distance = $(window).width() / max_size;
    let shortest_connections = {},
        shortest_distances = {};

    console.log(connections.length + " pairs found");

    for (points of connections) {
        let point1 = points[0],
            point2 = points[1];

        let key = JSON.stringify(point1),
            value = distance(point1, point2);

        let new_point_found = !(key in shortest_connections),
            closer_point_found = shortest_distances[key] > value,
            within_maximum_distance = value <= maximum_distance;

        if ((new_point_found | closer_point_found) & within_maximum_distance){
            shortest_connections[key] = point2;
            shortest_distances[key] = value;
        }
    }

    return shortest_connections;
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


 function draw_circle_connections(connections, circles, svgs, widths=[7, 5, 1]){
    /* Draw SVG paths for each connection in connections
     *
     * Parameters
     * ----------
     *      connections (array) : List of circles to connect
     *      circles (array) : List of circle layers
     *      svgs (array) : List of d3 selections svgs
     *      widths (array) : stroke-widths (px) for each layer
     */

    for (key in connections){
        let point1 = JSON.parse(key),
            point2 = connections[key];

        let layer = detect_layer(circles, point1);
        // console.log(layer);

        svgs[layer].append("path")
           .attr("stroke", "black")
           .attr("opacity", 0.5)
           .attr('stroke-width', widths[layer])
           .transition()
           .duration(5000)
           .attr("d", "M" + point1.cx +
                      "," + point1.cy +
                      " L" + point2.cx +
                      "," + point2.cy);

    }
 }


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

 function detect_layer(layers, shape){
    /* Return an integer indicating which layer an svg belongs to
     *
     * Parameters
     * ----------
     *      layers (array) : List of SVG selections
     *      shape (d3 selection) : Current SVG selection to check
     *
     * Notes
     * -----
     *      Should return an integer indicating the layer. However, if there is
     *      no match, then an undefined is returned.
     *
     */
     let layer, match_found = false;

     for (i in layers) {
        layer = i;

        // console.log("Index of " + i);
        for (obj of layers[i]) {
            if (objects_match(obj, shape)) {
                // console.log(obj, shape);
                match_found = true;
                break;
            }
        }

        if (match_found) {
            break;
        }
     }

     return layer;
 }

 function objects_match(a, b){
    /* Determine whether or not all of two objects' keys and values match
     *
     * Parameters
     * ----------
     *      a (obj) : first object to match with b
     *      b (obj) : second object to match with a
     */
     let matches = [];
     let keys = Object.keys(a);
     let keysb = Object.keys(b);
     let key, value1, value2;

     if (keys.length != keysb.length) {
        return false;
     }

     for (i in keys){
        key = keys[i];
        value1 = a[key];
        value2 = b[key];

        if (value1 == value2) {
            matches[i] = true;
        } else {
            matches[i] = false;
        }
     }

     return matches.every(function(item, i, arr){
        if (i === 0){
            return true;
        } else {
            return item === true;
        }
     })

 }

 function distance(a, b){
    /* Calculate the Euclidean distance between two points
     *
     * Parameters
     * ----------
     *      a (object) : first point to calculate
     *      b (object) : second point to calculate
     *
     * Notes
     * -----
     *      Points are generated by the generate_circle_attributes() function.
     *      They have the form: {cx : _, cy : _, fill : _, stroke : _}
     */
     if (a == undefined | b == undefined) {
        return undefined;
     }
     let x = a.cx - b.cx;
     let y = a.cy - b.cy;
     return Math.sqrt(x ** 2 + y ** 2);
 }

 function pair(circles){
    /* Create a new array of circle pairs
     *
     * Parameters
     * ----------
     *      circles (array) : List of circle objects
     *
     * Notes
     * -----
     *      Points are generated by the generate_circle_attributes() function.
     *      They have the form: {cx : _, cy : _, fill : _, stroke : _}
     */
     let at_least_two_circles = circles.length > 1;
     let exactly_two_circles = circles.length == 2;

     if (exactly_two_circles) {
        // console.log("Inside exactly_two_circles " + circles.length);
        return [circles];
     } else if (at_least_two_circles) {

        // Create pairs of circles from the current Array of circles
        let current = circles[0];
        let new_circles = circles.slice(1, circles.length);
        let current_pair, circle_pairs = [];

        for (circle of new_circles) {
            current_pair = [current, circle];

            if (!circle_pairs.includes(current_pair)) {
                circle_pairs.push(current_pair);
            }
        }

        return circle_pairs.concat(pair(new_circles));

     } else {
        console.log("No background circles detected.");
        return;
     }
 }
