/*
 * Filename: classes.js
 * Author: Glenn Abastillas
 * Date: February 25, 2020
 *
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 *
 * This module defines classes that are used in other js files for this site.
 *
 */

/**
 * InputData contains static methods to parse different types of input data.
 */
class InputData {

    /**
     * CSV Constructor class
     * @constructor
     */
    constructor(type = 'csv', has_header=true, sep=',', newline=/\r?\n/){
        this.type = type;
        this.sep = sep;
        this.newline = newline;
        this.has_header = has_header;
    }

    /**
     * Retrieve data from a specified column as an Array
     * @param {string} name - column name with data to return
     * @param {array} data - array of objects with data to return
     * @return {array} of data
     */
    static series(name, data){
        let column_data = [];
        let line;
        for (line of data){
            // console.log(line);
            column_data.push(line[name]);
        }
        return column_data;
    }

    /**
     * Transform loaded dataset for a bar chart or histogram
     * @param {object} data - data from value_counts() function
     * @param {string} name - column with data to categorize
     * @param {string} size - size of interval with which to bin numbers
     */
    static transform_data_for_bar_plot(data, name, size){
        let keys = Object.keys(data);
        let transformed_data = [];
        let i = 0;
        let line, key;

        while (i < keys.length){
            line = {};
            for (key of keys){
                line[key] = null;

                if (keys.indexOf(key) == i){
                    line[key] = data[key];
                }
            }
            transformed_data.push(line);
            i++;
        }

        return transformed_data;
    }

    /**
     * Determine whether or not an input string is an int or float
     * @param {string} string - text to check for numeracy
     */
    static is_numeric(string){
        let regex = /[0-9]+(\.[0-9]+)?/i;
        string = string.replace(",", "");
        return string.match(regex) != null;
    }

    /**
     * Convert an incoming string into a number if it is numeric
     * @param {string} string - text to convert
     */
    static convert_if_numeric(string){
        let regex = /[0-9]+(\.[0-9]+)?/i;
        string = string.replace(",", "");
        if (string.match(regex) != null){
            return parseFloat(string);
        } else {
            return string;
        }
    }

    /**
     * Return the headers of input data
     * Assumes data coming in is not yet parsed (i.e., it is a string)
     *
     * @param {string} data - data with headers to get
     */
    static headers(data, sep=",", newline=/\r?\n/){
        let is_array = data instanceof Array;
        let is_object = data instanceof Object;
        let is_string = data instanceof String;

        if (is_array){
            let first_line_is_array = data[0] instanceof Array;
            if (first_line_is_array){
                return data[0];
            } else {
                return data[0].split(sep);
            }
        } else if (is_object){
            return Object.keys(data);
        } else if (is_string){
            return this.headers(data.split(newline));
        } else {
            console.error("Unable to parse headers from data");
        }
    }

    /**
     * Split a csv/tsv/dsv string into a loopable list of data elements
     *
     * 'sep', 'newline', and 'data' variables are defined in the constructor
     *
     * @param {string} data - character delimited string to parse
     * @param {string} sep - delimiter for each line in the input data
     * @param {string} newline - delimiter for each new line in input data
     */
    static parse_csv(data, sep=',', newline=/\r?\n/){

        let lines = data.split(newline);
        let current_row = [], parsed_data = [];
        let headers, line, item;

        headers = this.headers(lines);
        lines = lines.slice(1, lines.length);
        // console.log(`Headers are ${headers}`);

        for (line of lines){
            line = line.split(sep);
            // console.log(line);

            for (item of line){
                // console.log("item " + item);

                if (this.is_numeric(item)){
                    current_row.push(parseFloat(item));
                } else {
                    current_row.push(item.trim());
                }
            }

            parsed_data.push(current_row);
            current_row = [];
        }
        return this.d3_format(headers, parsed_data);
    }


    /**
     * Split a json string into a loopable list of data elements
     *
     * 'sep', 'newline', and 'data' variables are defined in the constructor
     *
     * @param {string} data - character delimited string to parse
     */
    static parse_json(data){
        if (typeof data === "string"){
            data = JSON.parse(data);
        }

        let headers = this.headers(data);
        let column = data[headers[0]];
        let parsed_json = [];
        let i, header, line, item;

        if (column instanceof Object){

            for (i in column){
                line = {}
                for (header of headers){
                    line[header] = parseFloat(data[header][i]);
                }
                parsed_json.push(line);
            }
        } else {
            console.error("Cannot parse JSON");
        }
        return parsed_json;
    }

    /**
     * Convert parsed CSV data into a D3 compatible format
     *
     * @param {array} headers - Array of header names
     * @param {array} parsed_csv - Array of arrays of data to be converted
     *
     */
     static d3_format(headers, data){
        let d3_data = [];
        let d3_line = {};
        let header, line, item;

        for (line of data){
            for (header of headers){
                item = headers.indexOf(header);
                d3_line[header.trim()] = line[item];
            }
            d3_data.push(d3_line);
            d3_line = {};
        }

        return d3_data;
     }
}