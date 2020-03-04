/**
 * Filename: resume.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Classes used to build the background and resume on www.glennabastillas.com
 */

console.log("Inside resume.js");

var TEST = {
    "name" : "Booz Allen Hamilton",
    "title" : "Sr. Data Scientist",
    "location" : "Washington, DC",
    "years" : [2018, null],
    "summary" : "Management Consulting firm where I work with cross-functional teams to deliver NLP, ML, and design thinking solutions to meet client needs at the National Institutes of Health (NIH) and Veterans Affairs (VA).",
    "description" : [
        "Lead data science efforts in collaboration with human centered design teams",
        "Plan projects, elicit requirements, iterate on deliverables, and present reports to client",
        "Develop NLP and machine learning algorithms, topic models, and automated pipelines",
        "Develop browser-based tools for workshops, presentations, and client engagement",
        "Conduct design thinking and requirements gathering workshops with stakeholders",
        "Founded and led rapid response team to address urgent, ad-hoc client needs"
    ]
}

class Publication {

    /**
     * Publication represents the articles, posters, and presentations performed
     * and creates the text for the publications section of a resume or CV.
     *
     * @param {string} authors - name of contributing authors of this work
     * @param {string} year - year published or presented
     * @param {string} work - name of article, presentation, or poster
     * @param {string} context - conference, event, or publication
     *
     * @constructor
     */
    constructor(authors, year, work, context){
        this.authors = authors;
        this.year = year;
        this.work = work;
        this.context = context;
    }

    /**
     * Create a string to be inserted into the publication section
     * @returns {string} Representing a formatted publication entry.
     */
    write_publication(){
        return `<ol>${this.write_entry()}</ol>`;
    }

    /**
     * Create a single entry publication for the publication section
     * @returns {string} Representing a single formatted publication entry.
     */
    write_entry(){
        return `${this.authors} (${this.year}). "${this.work}". ${this.context}`
    }
}

class Organization {

    /**
     * Organization represents an employer and creates the text for the
     * professional experience section of a resume or CV.
     *
     * @param {string} name - Name of the organization
     * @param {string} title - Job title at the organization
     * @param {array} years - Array of years spent at the organization.
     * @param {array, string} location - Location of the organization
     * @param {array, string} description - Job description at the organization
     *
     * @constructor
     */
    constructor(name, title, location, years, description, summary){
        this.name = name;
        this.title = title;
        this.years = years;
        this.location = location;
        this.description = description;
        this.summary = summary;
        this.sep = '/';
        this.to_sep = '&rightarrow;';
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {string} text - Resume text read from file
     *
     */
    parse(text){
        let lines = text.split();
        let header = lines[0].split(";");

        this.name = header[0];
        this.title = header[1]
        this.summary = lines[1];
        this.description = lines.slice(2,lines.length);
    }

    /**
     * Create the HTML to be insert into the body of the document
     * @param {Object} selection - jQuery or D3 selection of the region in the
     *                 document the generated HTML is to be inserted into.
     *
     */
    write_organization(selection){
        return `${this.write_header()}${this.write_body()}`
    }

    /**
     * Create the header containing the Organization / Job Title / Location
     * @returns {string} Header (3) with all header information embedded.
     */
    write_header(){
        let descriptor = this.write_header_descriptor();
        let title = `${this.name} <span>${descriptor}</span>`;
        return `<h3>${title}</h3>`;
    }

    /**
     * Create the header descriptor that is embedded in the header
     * @returns {string} Descriptor with all header information
     *
     * @notes Header format is NAME / JOB TITLE / LOCATION / YEARS
     *
     */
    write_header_descriptor(){
        let a = this.title,
            b = this.location,
            c = this.write_years(),
            s = this.sep;
        return `${s} ${a} ${s} ${b} ${s} ${c}`;
    }

    /**
     * Create the year's text and assign null values to 'Present'
     * @returns {string} Descriptor of years with an organization
     */
    write_years(){
        let start = this.years[0],
            end = this.years[1];

        if (end === null){
            end = 'Present';
        }
        return `${start} ${this.to_sep} ${end}`;
    }

    /**
     * Create the body text for an organization listing
     * @returns {string} Body text, which includes the list.
     *
     */
    write_body(){
        let bullets = '', index;
        for (index in this.description){
            bullets += this.write_body_bullet(index);
        }
        return `<ul>${bullets}</ul>`;
    }

    /**
     * Create the bullet text for the body text
     * @returns {string} Each description element as a bullet
     *
     */
    write_body_bullet(index){
        return `<li>${this.description[index]}</li>`;
    }
}