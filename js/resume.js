/**
 * Filename: resume.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Classes used to build the background and resume on www.glennabastillas.com
 */


class Organization {

    /**
     * Invoked with new Organization() declaration.
     *
     * @param {string} name - Name of the organization
     * @param {string} title - Job title at the organization
     * @param {array} years - Array of years spent at the organization.
     * @param {array, string} location - Location of the organization
     * @param {array, string} description - Job description at the organization
     *
     * @constructor
     */
    constructor(name, title, location, years, description){
        this.name = name;
        this.title = title;
        this.years = years;
        this.location = location;
        this.description = description;
        this.sep = '/';
        this.to_sep = '&rightarrow';
    }

    /**
     * Create the HTML to be insert into the body of the document
     * @param {Object} selection - jQuery or D3 selection of the region in the
     *                 document the generated HTML is to be inserted into.
     *
     */
    write_section(selection){

    }

    write_header(){
        let descriptor = this.write_header_descriptor();
        let title = `${this.name} <span>${descriptor}</span>`;
        return `<h3>${title}</h3>`;
    }

    write_header_descriptor(){
        let a = this.name,
            b = this.title,
            c = this.location,
            d = this.description,
            s = this.sep;
        return `${s} ${a} ${s} ${b} ${s} ${c} ${s} ${d}`;
    }

    write_body(){}
    write_body_bullet(){}
}