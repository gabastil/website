/*
 * Filename: content.js
 * Author: Glenn Abastillas
 * Date: February 25, 2020
 *
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 *
 * This module loads resume content onto the HTML.
 *
 */

$(document).ready(function(){

    const SVG = d3.select("svg[id='data-plot']"),
          SVG_ = $("svg[id='data-plot']"),
          INPUT_FILE = $("input[type='file']"),
          PLOT_DATA = $("input[type='submit']"),
          CLEAR = $("button[id='clear-data']"),
          TITLE = $("input[name='chart-title']")
          ;

    const PLOT_W = SVG_.width(),
          PLOT_H = SVG_.height(),
          MARGIN = 50,
          WIDTH = PLOT_W - MARGIN,
          HEIGHT = PLOT_H - MARGIN
          ;

    var SCALEX = d3.scaleLinear().range([MARGIN, WIDTH]),
        SCALEY = d3.scaleLinear().range([MARGIN, HEIGHT]);

    var RAW_DATA;

    // DELETE THESE LATER
    // SVG.append("path").attr("d", `M${MARGIN},${MARGIN} H${WIDTH}`).attr("stroke", "black");
    // SVG.append("path").attr("d", `M${MARGIN},${MARGIN} V${HEIGHT}`).attr("stroke", "black");
    // SVG.append("path").attr("d", `M${MARGIN},${HEIGHT} H${WIDTH}`).attr("stroke", "black");
    // SVG.append("path").attr("d", `M${WIDTH},${MARGIN} V${HEIGHT}`).attr("stroke", "black");

    function load_file(e){
        // Load a specified JSON file from the input[type='file'] element

        if(!FileReader && !FILE){
            console.warn("Unable to read file");
        } else {
            let reader = new FileReader();
            reader.onload = function(e){
                RAW_DATA = JSON.parse(reader.result);
                // console.log(RAW_DATA);
                console.log(Object.keys(RAW_DATA).length);
                update_select_options(RAW_DATA);
            }
            reader.onerror = function(e){
                console.warn("FileReader unable to read file");
            }
            reader.readAsText(INPUT_FILE[0].files[0]);

            if (TITLE.val() == "") {
                TITLE.val(`${INPUT_FILE[0].files[0].name}`);
                update_chart_title();
                console.log(INPUT_FILE[0].files);
            }
        }
    }

    // - - - - - - CALCULATE PLOT AREA NUMERS (E.G., RANGE, DOMAIN) - - - - - -
    function update_select_options(data){
        /* Update the <option> tags in each <select> tag group
         *
         * Parameters
         * ----------
         *      data (Object) : Data whose columns are to be insert into select
         */
        let columns = Object.keys(data);
        let selects = d3.selectAll("select");

        for (variable of columns){
            selects.append("option")
                   .text(variable);
        }

    }

    // - - - - - - CALCULATE PLOT AREA NUMERS (E.G., RANGE, DOMAIN) - - - - - -
    function get_domain(series){
        /* Get the domain figures for an axis scale
         *
         * Parameters
         * ----------
         *      series (Array) : get the maximum and minimum input values
         *
         * Notes
         * -----
         *      Input series should be an array. If it is an object, it will be
         *      converted into an array.
         */

        series = values(series);
        let min = Math.min(...series), max = Math.max(...series);
        return [Math.floor(min), Math.ceil(max)];
    }

    function get_range(){}

    // - - - - - - - GET D3 SVG ELEMENTS RELATED TO THE MAIN PLOT - - - - - - -
    function get_group(parent = SVG, id = 'main'){
        /* Get the main plot group
         *
         * Parameters
         * ----------
         *      parent (Object) : Selection from d3.select
         *      id (string) : ID name of the object to retrieve
         *
         * Notes
         * -----
         *      This function returns child elements of the parent or creates
         *      them if they do not already exist.
         */
        let g = parent.select(`g[id='${id}']`);
        if (g.size() === 0){
            return parent.append("g").attr("id", id);
        } else {
            return g;
        }
    }

    function get_main(){
        /* Get the main plot group
         *
         * Notes
         * -----
         *      This group will contain all of the visual elements related to
         *      the plot. This includes the title, axes, and main visual.
         */
        return get_group(SVG, "main");
    }

    function get_title(){
        /* Get the title group
         *
         * Notes
         * -----
         *      This group will contain the title for the chart.
         */
        return get_group(get_main(), "title");
    }

    function get_plot(){
        /* Get the plot area
         *
         * Notes
         * -----
         *      This group will contain the drawing area for the plot
         */
         return get_group(get_main(), "plot")
    }


    // - - - - - - - - - UPDATE NON-GRAPH ELEMENTS OF THE PLOT - - - - - - - - -
    function update_chart_title(){
        /* Update the SVG chart title based on input
         *
         * Notes
         * -----
         *      The title element is a group in the SVG field
         */

        let title = get_title();
        let text = title.select("text[id='title']");

        if (text.size() === 0){
            title.append("text")
                 .attr("id", "title")
                 .attr("x", MARGIN)
                 .attr("y", MARGIN)
                 .attr("width", WIDTH)
                 .text(TITLE.val());
        } else {
            text.text(TITLE.val());
        }
    }


    // - - - - - - - - - - UPDATE GRAPH ELEMENTS OF THE PLOT - - - - - - - - - -
    function scatter_plot(){
        // Plot RAW_DATA onto the SVG field
        clear_svg_children();
        let g = get_plot();

        let data = listify_data({'lat' : RAW_DATA['lat'],
                                 'lon' : RAW_DATA['lon']});

        draw_axes(RAW_DATA['lat'], RAW_DATA['lon']);

        // - - - - - - - - DRAW AXES AND DATA - - - - - - - - //
        let cx = function(d){return SCALEX(d.lat)};
        let cy = function(d){return SCALEY(d.lon)};

        // Plot data
        g.selectAll("circle")
           .data(data)
           .enter()
           .append('circle')
           .attr("cx", cx)
           .attr("cy", cy)
           .attr("r", 1)
           .attr("fill", "red");
    }

    function draw_axes(x, y){
        /* Draw the x and y axes along the main plot.
         *
         * Parameters
         * ----------
         *     x (obj [array]) : an object containing all of the x-axis data.
         *     y (obj [array]) : an object containing all of the y-axis data.
         * Notes
         * -----
         *     The data from x and y are Objects because of the way that Pandas
         *     in Python outputs CSV data as JSON formats.
         *     They have the form:
         *       {"index" : "value", ..., n : value-n}
         */

        let domain_x = get_domain(x).sort(function(a,b){return b-a}),
            domain_y = get_domain(y);

        SCALEX.domain(domain_x);
        SCALEY.domain(domain_y);

        let x_axis = d3.axisBottom(domain_x).scale(SCALEX);
        let y_axis = d3.axisLeft(domain_y).scale(SCALEY);

        // Draw axes
        let main = get_main()

        main.append("g")
             .attr("id", "axis")
             .attr("transform", `translate(0, ${HEIGHT})`)
             .call(x_axis);

        main.append("g")
             .attr("id", "axis")
             .attr("transform", `translate(${MARGIN}, 0)`)
             .call(y_axis);

        return [SCALEX, SCALEY];
    }

    INPUT_FILE.change(load_file);
    PLOT_DATA.click(scatter_plot);
    CLEAR.click(clear_svg_children);
    TITLE.change(update_chart_title);
});

/* - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - */
/* Class Definitions

    D3 Objects
        Scale
 */

class Scale {
    constructor(domain_x, domain_y, range_x, range_y, clamp = true){
        this.domain = { x : domain_x, y : domain_y};
        this.range = { x : range_x, y : range_y};

        this.scaler = d3.scaleLinear();
        this.scale_x = this.scaler.domain(this.domain.x).range(this.range.x);
        this.scale_y = this.scaler.domain(this.domain.y).range(this.range.y);

        this.scale_x.clamp(clamp);
        this.scale_y.clamp(clamp);
    }

    x(value){
        return this.scale_x(value);
    }

    y(value){
        return this.scale_y(value);
    }
}


class DataFromPandas {
    construtor(data){
        this.columns = Object.keys(data);
        this.size = null;
        this.data = null;
    }
    // Implement conversion functions
}

/* - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - */
/* Methods to draw visualization elements onto the SVG area */

/* - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - */

function items(obj){
    let items_ = [];

    for (key in obj){
        items_.push([key, obj[key]]);
    }

    return items_;
}

function values(obj){
    let values_ = [];

    if (typeof obj === Array){
        return obj;
    }

    for (item in obj){
        values_.push(obj[item]);
    }

    return values_;
}

function keys(obj){
    return Object.keys(obj);
}

function listify_data(data){
    // Convert data saved in JSON format from Pandas into a D3 format

    let columns = Object.keys(data);
    let indices = Object.keys(data[columns[0]]).map(function(item){return +item});
    let size = indices.length;
    let is_odd = size % 2;
    let limit = ((size - is_odd) / 2) + Math.min(...indices);
    let list = [];

    if (is_odd){
        for (column of columns){
            list.push(data[column][limit + 1]);
        }
    }

    let current = {}, previous = {}, i = 0, curr_i, prev_i, curr_value, prev_value;

    let undef_count = 0, def_count = 0, current_size, previous_size;

    while (i < limit){
        curr_i = (limit + i).toString();
        prev_i = (limit - i - 1).toString();

        for (column of columns){
            curr_value = data[column][curr_i];
            prev_value = data[column][prev_i];

            if (curr_value != undefined && prev_value != undefined){
                current[column] = +curr_value;
                previous[column] = +prev_value;
            }

            if (curr_value === undefined && prev_value === undefined){
                undef_count += 1;
            } else {
                def_count += 1;
            }
        }

        current_size = Object.keys(current).length > 0;
        previous_size = Object.keys(previous).length > 0;

        if (current != undefined && current_size){list.push(current)}
        if (previous != undefined && previous_size){list.unshift(previous)}

        // console.log(current);

        // list.push(current);
        // list.unshift(previous);
        current = {};
        previous = {};
        i++;
    }
    // console.log(list);
    // console.log(`Defined count: ${def_count}\tUndefined Count: ${undef_count}`);
    return list;
}

function splitLines(file, sep = '\n'){
    // Return a list of strings split by newline
    return file.split(sep);
}

function parseCSV(file, sep = ','){
    /* Parses a comma separated string into an array containing arrays of values

        Parameters
        ----------
            file (string) : Comma separated data
            sep (string) : Delimiter (default is a comma) used for the data
     */
    let data = [];
    let size = 0;
    let array, warning;

    file = splitLines(file);

    // Split each line by a comma (default)
    for (line of file){
        array = line.split(sep);

        if (array.length > size) {
            size = array.length;
        }

        if (array.length == size){
            data.push(array);
        } else {
            warning = "Row " + line + " has " + array.length + " element(s). " +
                      "Other data have " + size + " element(s)."
            console.warn(warning);
        }
    }

    console.log(data);
    return data;
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// WORK ON THESE FUNCTIONS AT A LATER TIME
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function arrayToJSON(array, headers = true){
    /* Converts the output of parseCSV into a JSON object.

        Parameters
        ----------
            array (Array) : data from parseCSV.
            header (bool) : True (default) if first row is header data

        Notes
        -----
            This function assumes the first row is a header row and that the
            subsequent data are rows.
     */

    let columns = headers ? array[0] : range(0, array[0].length);
    let index, column, obj;

    for (name of columns){

        // Ensure that the appropriate header type is used (index vs string)
        if (!headers){
            index = name
        } else {
            index = columns.indexOf(name);
        }

        obj[name] = columns[index]

        console.log(index + " " + obj[name]);
    }
}

function range(start, stop, step=1){
    /* Generate a range of integers from an indicated start to stop range */

    let numbers = [];

    if (start === stop){
        return numbers;
    }

    step = start > stop ? -step : step;

    while (start < stop){
        // console.log(start);
        numbers.push(start);
        start += step;
    }

    return numbers;
}

/* FUNCTIONS TO PLOT DATA ONTO SVG CANVAS ONCE LOADED */

function clear_svg_children(){
    // Delete all SVG visual elements
    let plot = $("g[id='plot']");
    let axes = $("g[id='axis']");
    plot.children().fadeOut(1000).parent().empty();
    axes.children().fadeOut(1000).parent().empty();
    console.log("All svg elements cleared");
}


/*
 * FUNCTIONS for MOUSE
 *
 * These functions relate to getting and setting variables related to the mouse
 */

function mouse_position(e){
    return { x : e.pageX, y : e.pageY };
}


/*
 * FUNCTIONS FOR SELECTION DATASET ATTRIBUTES FOR VISUALIZATIONS
 *
 *
 */


function update_select_options(){
    let select_dataset = $("select[name='dataset']");
}