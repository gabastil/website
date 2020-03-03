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


 $(document).ready(function(){
     var xref = $("path #x-reference");
     var yref = $("path #y-reference");
     const win = $(window);

    xref.attr('d', `M25,25 H1000`);

    console.log(xref.width());

    const svg =d3.select('svg');

     // console.log(svg._groups);
     // console.log($(`path #p0`).length);
    let checkbox = $("input[type='checkbox']");

    let path_d = 'M';
    let iterator = 0;
    let draw_mode = false;
    let path_data = [];

    $("#menu").on("mouseover", function(e){console.log(mouse_position(e))});

    let draw_line = function(e){


        let has_start = path_d.indexOf("M") > 0;
        let has_finish = path_d.indexOf("Z") > 0;

        let minY = $("svg").position().top;
        let minX = $("svg").position().left;
        let x = e.pageX - minX,
            y = e.pageY - minY;

        if (path_d.length === 1){path_d += `${x},${y} `;}
        else {path_d += `L${x},${y} `;}


        // - - - - - - - - - - - - - - - - - - - - - - - - - -

        let current_id = `path #p${iterator}`
        let current_el = d3.select(current_id);
        let path;

        if (!path_data.length){
            path = {current_id : null};
            // console.log(path);
        }

        // console.log(path_data.hasOwnProperty(current_id));



        // let current_path = $(`path #p${iterator}`)[0];

        // let current_path = d3.select(`path #p${iterator}`);
        // let current_path_ = d3.select(`#p${iterator - 1}`);

        // console.log(`path #p${iterator - 1}`);
        // console.log(current_path_);
        // console.log(current_path_._groups[0][0]);

        // if (current_path_ == undefined){
        //     console.log("Path is undefined");
        // }
        // let current_path_exists = current_path_._groups;

        // console.log(current_path_._groups);

        // console.log("Testing truthfulness " + $(`path #p0`).length);
        // console.log(`Current path ${current_path}`);
        // console.log(`#p${iterator}`);


        // if (current_path._groups[0][0] === null & draw_mode){
        //     current_path = svg.append(`path`)
        //                       .attr('id', `p${iterator}`)
        //                       .attr('stroke', 'black')
        //                       .attr('stroke-width', '5px')
        //                       .attr('fill', 'none');
        // }
        // let d3_path = d3.select(`path #p${iterator}`);

        // console.log(d3_path._groups[0]);


        // if (draw_mode){
        //     current_path.attr("d", path_d);
        // }

        $('#coords').text(`X ${e.pageX}, Y ${e.pageY}`);
        // console.log($(`path #p${iterator}`).attr("d"));
    };

    $("svg").on("mousemove", draw_line)
            .on("click", function(){
                // let current_path = $(`path #p${iterator - 1}`);

                // console.log(current_path);

                // current_path.attr('d', path_d);
                path_d = "M";
                iterator++;
                draw_mode = !draw_mode;
            })

    // $('svg').on('mousemove', test_func).on("click", function(){
    //         svg.append('path')
    //            .attr('d', path_d)
    //            .attr('stroke', 'black')
    //            .attr('stroke-width', '1em')
    //            .attr('fill', 'none');

    //         path_d = 'M';
    // }).on('mousedown', function(e){

    //     let minY = $("svg").position().top;
    //     let minX = $("svg").position().left;
    //     let x = e.pageX - minX,
    //         y = e.pageY - minY;

    // });

    $('button #clear-data').click(clear);

 });

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
        // console.log(start);
        numbers.push(start);
        start += step;
    }

    return numbers;
}

/* FUNCTIONS TO PLOT DATA ONTO SVG CANVAS ONCE LOADED */

function plot(data = input_data){

    let window_width = $("svg").width();
    let window_height = $("svg").height();
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

    let scale_y = d3.scaleLinear().domain([a, b]).range([c, d]);

    // Y-Axis
    a = Math.min(...lon);
    b = Math.max(...lon);
    c = border_y;
    d = window_height - (4 * c);

    let scale_x = d3.scaleLinear().domain([a, b]).range([d, c]);
    let _data = [];

    console.log(`${a} ${b} ${c} ${d}`);

    for (i in lat){
        // console.log(i);
        _data[i] = {lat : lat[i], lon : lon[i]};
    }

    console.log("data length " + _data.length);

    d3.select('svg').selectAll('circle')
      .data(_data)
      .enter()
      .append('circle')
      .attr('cx', function(d){return scale_x(d.lon)})
      .attr('cy', function(d){return scale_y(d.lat)})
      .attr('lat', function(d){return d.lat})
      .attr('lon', function(d){return d.lon})
      .attr('r', 1)
      .attr('fill', 'red');
      // .attr('stroke', 'black')
      // .attr('stroke-width', '1px');
}


function clear(){
    d3.select("svg").selectAll('circle').exit().remove();
    console.log("In clear function");
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