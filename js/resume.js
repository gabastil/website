/**
 * Filename: resume.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * Classes used to build the background and resume on www.glennabastillas.com
 */

console.log("Inside resume.js");

class Background {

    /**
     * Background represents an summary information about this CV and writes
     * text for the education section of a resume or CV.
     *
     * @param {string} summary - brief summary of resume
     * @param {array [object} skills - names of skills and applicable tools
     *
     * @constructor
     */
    constructor(summary, skills){
        this.summary = summary;
        this.skills = skills
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} background - Resume text read from JSON objects
     *
     */
    static parse(background){
        let summary = background.summary;
        let skills = background.skills;

        let new_skills = [], A, k;

        for (k of skills){
            A = new Skill(k.skill, k.list);
            new_skills.push(A);
        }
        return { summary : summary, skills : new_skills};
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} skills - Resume text read from JSON objects
     *
     */
    static write(background){
        let skills_string = '', skill;
        let skills = this.parse(background);

        for (skill of skills.skills){
            skills_string += skill.write_skill();
        }

        return `<span id="background">${skills.summary}</span><ul>${skills_string}</ul>`;
    }
}

class Skill {

    /**
     * Skill represents a group of skills that can be bound under a single label
     * and writes text for the background section of a resume or CV.
     *
     * @param {string} skill - title of skill
     * @param {array [string]} items - names of skills and applicable tools
     *
     * @constructor
     */
    constructor(skill, items){
        this.skill = skill;
        this.items = items;
    }

    /**
     * Create a string of the skill and its items
     * @returns {string} skill and items in an HTML string
     *
     */
    write_skill(){
        return `<li>${this.skill}<br>${this.items.join(", ")}</li>`;
    }
}

class Education {
    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} schools - Resume text read from JSON objects
     *
     */
    static parse(schools){
        let new_schools = [], A, k;

        for (k of schools){
            A = new School(k.school, k.years, k.degree, k.other);
            new_schools.push(A);
        }
        return new_schools;
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} schools - Resume text read from JSON objects
     *
     */
    static write(schools){
        let schools_string = '', school;
        schools = this.parse(schools);

        for (school of schools){
            schools_string += school.write_school();
        }
        return `<ul>${schools_string}</ul>`;
    }
}

class School {

    /**
     * School represents an academic instution attended and creates the text 
     * for the education section of a resume or CV.
     *
     * @param {string} school - name of school
     * @param {array [integer]} years - years attended
     * @param {string} degree - name of degree obtained
     * @param {string} other - other information that should be HTML formatted
     *
     * @constructor
     */
    constructor(school, years, degree, other){
        this.school = school;
        this.years = years;
        this.degree = degree;
        this.other = other;
        this.to_sep = '&rightarrow;';
    }

    /**
     * Create the HTML to be insert into the body of the document
     * @param {Object} selection - jQuery or D3 selection of the region in the
     *                 document the generated HTML is to be inserted into.
     * @returns {string} Full HTML block text ready for insertion in the DOM
     */
    write_school(){
        let school = `<span class="university-name">${this.write_name()}</span>`;
        let degree = `${this.write_degree()}`;
        let years = `${this.write_years()}`;
        return `<li>${school}<br>${degree}, ${years}</li>`;
    }

    /**
     * Create a string for the school attended
     * @returns {string} Name of school attended
     */
    write_name(){
        return this.school;
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
        } else if (start === null) {
            return `${end}`;
        } else {
            return `${start} ${this.to_sep} ${end}`;
        }
    }

    /**
     * Create a string for the type of degree earned at this school
     * @returns {string} Degree obtained
     */
    write_degree(){
        return this.degree;
    }
}

class Publications {
    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} publications - Resume text read from JSON objects
     *
     */
    static parse(publications){
        let new_publications = [], A, k;

        for (k of publications){
            A = new Publication(k.authors, k.year, k.name, k.other);
            new_publications.push(A);
        }
        return new_publications;
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} publications - Resume text read from JSON objects
     *
     */
    static write(publications){
        let publications_string = '', publication;
        publications = this.parse(publications);

        for (publication of publications){
            publications_string += publication.write_publication();
        }
        return `${publications_string}`;
    }
}

class Publication {

    /**
     * Publication represents the articles, posters, and presentations performed
     * and creates the text for the publications section of a resume or CV.
     *
     * @param {string} authors - name of contributing authors of this work
     * @param {string} year - year published or presented
     * @param {string} work - name of article, presentation, or poster
     * @param {string} other - conference, event, or publication
     *
     * @constructor
     */
    constructor(authors, year, name, other){
        this.authors = authors;
        this.year = year;
        this.name = name;
        this.other = other;
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
        let other = this.write_other();
        return `${this.authors} (${this.year}). "${this.name}". ${other}`
    }

    /**
     * Create a single entry publication for the publication section
     * @returns {string} Representing a formatted contextual publication info
     */
    write_other(){
        let other = '', item;

        for (item in this.other){
            other += `${this.other[item]}. `
        }

        return other;
    }
}

class Experience {

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} organizations - Resume text read from JSON objects
     *
     */
    static parse(organizations){
        let new_organizations = [], A, k;

        for (k of organizations){
            A = new Organization(k.name, 
                                 k.title, 
                                 k.location,
                                 k.years,  
                                 k.description,
                                 k.summary);

            new_organizations.push(A);
        }
        return new_organizations;
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} organizations - Resume text read from JSON objects
     *
     */
    static write(organizations){
        let organizations_string = '', organization;
        organizations = this.parse(organizations);

        for (organization of organizations){
            organizations_string += organization.write_organization();
        }
        return `<ul>${organizations_string}</ul>`;
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
     * Create the HTML to be insert into the body of the document
     * @param {Object} selection - jQuery or D3 selection of the region in the
     *                 document the generated HTML is to be inserted into.
     * @returns {string} Full HTML block text ready for insertion in the DOM
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
        let title = `${this.name}<span> ${descriptor}</span>`;
        let summary = `${this.write_summary()}`;
        return `<h3>${title}</h3>${summary}`;
    }

    /**
     * Create the summar containing a brief description of the background
     * @returns {string} Summary blurb of brief description of position
     */
    write_summary(){
        if (this.summary != undefined || this.summary != null){
            return this.summary;
        } else {
            return '';
        }
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