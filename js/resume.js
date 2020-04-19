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
        let skills = '', skill;
        let skills_json = this.parse(background);

        for (skill of skills_json.skills){
            skills += skill.write_skill();
        }
        skills = `<div id='all-skills'>${skills}</div>`
        return `<span id="background">${skills_json.summary}</span>${skills}`;
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
     * @since 3/6/2020 - each skill will be contained in a div
     *
     */
    write_skill(){
        let skill = `<div class='skill-name'>${this.skill}</div>`;
        let items = `<li>${this.items.join("</li><li>")}</li>`;
        items = `<div class='skill-items'>${items}</div>`;
        return `<div class='skill'>${skill}${items}</div>`;
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
        return `<li>${school}${degree}, ${years}</li>`;
    }

    /**
     * Create a string for the school attended
     * @returns {string} Name of school attended
     */
    write_name(){
        return `<h3>${this.school}</h3>`;
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
            A = new Publication(k.authors, k.year, k.name, k.other, k.link);
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
        return `<ol>${publications_string}</ol>`;
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
     * @param {string} link - URL to online resource if available
     *
     * @constructor
     */
    constructor(authors, year, name, other, link = null){
        this.authors = authors;
        this.year = year;
        this.name = name;
        this.other = other;
        this.link = link;
    }

    /**
     * Create a string to be inserted into the publication section
     * @returns {string} Representing a formatted publication entry.
     */
    write_publication(){
        return `<li>${this.write_entry()}</li>`;
    }

    /**
     * Create a single entry publication for the publication section
     * @returns {string} Representing a single formatted publication entry.
     */
    write_entry(){
        let other = this.write_other();
        let entry;

        entry = `${this.authors} (${this.year}). "${this.name}". ${other}`

        if (this.link != null){
            entry = `<a href='${this.link}' target='_blank'>${entry}</a>`;
        }

        return entry;
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

class Resources {

    /**
     * Resource represents a resource to be added in the Contacts section
     *
     * @param {string} contact - contact type
     * @param {string} link - link to contact
     *
     * @constructor
     */
    constructor(contact, link){
        this.contact = contact;
        this.link = link;
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} resources - Resume text read from JSON objects
     *
     */
    static parse(resources){

        // console.log(resources);
        // let type = resources.type;
        // let link = resources.link;

        let parsed_resources = [], A, k;

        for (k of resources){
            A = new Resource(k.group, k.type, k.link);
            parsed_resources.push(A);
        }
        return parsed_resources;
    }

    /**
     * Read in block resume text and parse out the different segments
     * @param {array [json]} skills - Resume text read from JSON objects
     *
     */
    static write(resources){
        let resources_string = '', resources_groups = {}, resource;
        resources = this.parse(resources);

        for (resource of resources){

            if (~resources_groups.hasOwnProperty(resource.group)){
                resources_groups[resource.group] = [];
            }


            resources_groups[resource.group].push(resource.write_resource());

            // Replace below line with new groupings line above
            resources_string += resource.write_resource();
        }

        console.log(resources_groups);

        return `<ul>${resources_string}</ul>`;
    }
}

class Resource {

    /**
     * Resource represents a resource to be added in the Resources section
     *
     * @param {string} category - resource grouping (e.g., projects, contact)
     * @param {string} type - contact type
     * @param {string} link - link to contact
     *
     * @constructor
     */
    constructor(group, type, link){
        this.group = group;
        this.id = `resources-group-${group.toLowerCase().replace(' ', '-')}`;
        this.type = type;
        this.link = link;
    }

    /**
     * Retrieve the div corresponding to this Resource's group and create one
     * if necessary
     * @returns {object} - JQuery object for this Resource's group
     */
    get_group(){
        let group = $(`div[id='${this.id}']`);

        if (group.length === 0){
            let resources = $(`div[id='resources-groups']`);
            console.log(resources);
            resources.append(`<div id='${this.id}'></div>`);
            group = $(`div[id='${this.id}']`);
            group.append(`<h3>${this.group}</h3>`)
        }

        return group;
    }

    /**
     * Create the HTML to be insert into the body of the document
     * @param {Object} selection - jQuery or D3 selection of the region in the
     *                 document the generated HTML is to be inserted into.
     * @returns {string} Full HTML block text ready for insertion in the DOM
     */
    write_resource(){
        let id = `id='resource-${this.type}'`;
        let href = `href='${this.link}'`;
        let resource = `<a ${id} ${href} target='_blank'>${this.type}</a>`;
        return `<li>${resource}</li>`;
    }
}
