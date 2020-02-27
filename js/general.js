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

 var input_data;

 function readInputFile(input){
    /*  Open and read in a file into the browser workspace

        Parameters
        ----------
            None

        Notes
        -----
            This function must be bound to an <input> action.

            The JSON files output by Pandas and parsed by JSON use the format:
                {
                    "header_0" : {0 : "datum", 1 : "datum", ..., n : "datum"},
                        ...
                    "header_n" : {0 : "datum", 1 : "datum", ..., n : "datum"}
                }
     */

     console.log("Using open() function.");

     let file = $(input)[0];
     let reader = new FileReader();

     reader.onload = function(e){
        input_data = JSON.parse(reader.result);
        console.log(input_data);
        plot(input_data);
     }

     reader.onerror = function(e){
        console.warn(e.target.error.code);
        alert("File not opened. Error: " + e.target.error.code);
     }

     reader.readAsText(file.files[0]);

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
        console.log(start);
        numbers.push(start);
        start += step;
    }

    return numbers;
}

/* FUNCTIONS TO PLOT DATA ONTO SVG CANVAS ONCE LOADED */

function plot(data = input_data){
    let window_width = $(window).width();
    let window_height = $(window).height();
    let border_x = window_width * 0.1;
    let border_y = window_height * 0.1;

    let lat = [], lon = [];


    for (let [k, v] of Object.entries(data.lat)){
        lat.push(v);
    }

    for (let [k, v] of Object.entries(data.lon)){
        lon.push(v);
    }

    // X-Axis
    let a = Math.min(...lat),
        b = Math.max(...lat),
        c = border_x,
        d = window_width - (4 * border_x);

    console.log(`${c} ${d} ${window_width}`);

    let scale_x = d3.scaleLinear().domain([a, b]).range([c, d]);

    // Y-Axis
    a = Math.min(...lon);
    b = Math.max(...lon);
    c = border_y;
    d = window_height - (4 * c);

    let scale_y = d3.scaleLinear().domain([a, b]).range([c, d]);

    d3.select('svg').selectAll('circle')
      .data(lat)
      .enter()
      .append('circle')
      .attr('cx', function(d, i){return scale_x(i)})
      .attr('cy', 300)
      .attr('r', 5)
      .attr('fill', 'red')
      .attr('stroke', 'black')
      .attr('stroke-width', '1px');


}