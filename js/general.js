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

        // $('#visualization').text(Object.keys(input_data));
        $('#visualization').text(input_data.region);
        console.log(input_data);

        // let data = parseCSV(input_data);
        // arrayToJSON(data);
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