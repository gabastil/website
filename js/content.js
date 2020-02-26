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

const background = 'Background',
      experience = 'Professional Experience',
      publications = 'Publications & Presentations',
      education = 'Education',
      links = 'Links';

const data = {
    headers : {
        // Data for section headers goes here.
        title : [background, experience, publications, education, links],
        links : [
                    {href : '#background', text : 'to ' + background},
                    {href : '#experience', text : 'to ' + experience},
                    {href : '#publications', text : 'to ' + publications},
                    {href : '#education', text : 'to ' + education},
                    {href : '#links', text : 'to ' + links},
                    {href : '#top', text : 'to ' + top},
                ]
    },
    content : {
        // Data for section content goes here.
        background : {
            summary : 'Data scientist, natural language processing (NLP) ' +
                      'developer, and computational linguist with over ' +
                      'seven years of experience developing NLP and machine ' +
                      'learning (ML) algorithms, dashboards, data ' +
                      'visualizations, and supporting research in the health ' +
                      'domain. He takes a human-centered design approach ' +
                      'to developing solutions and software for clients.',
            skills : {
                programming : ['Python', 'R', 'SQL', 'JavaScript',
                               'Java', 'Lua', 'PHP', 'VBA'],
                frameworks : ['HTML', 'XML', 'YAML', 'CSS', 'D3', 'Markdown',
                              'JSON', 'HL7', 'FHIR'],
                development_ides : ['Anaconda', 'Spyder', 'Jupyter', 'SageMaker',
                                    'RStudio', 'I2E', 'IntelliJ', 'Eclipse'],
                distributed_computing : ['Multithreading', 'Multiprocessing',
                                         'Spark', 'Hadoop'],
                visual_editing : ['Docker', 'Anaconda', 'GitHub', 'Azure', 'AWS'],
                dashboards : ['Power BI', 'Tableau'],
                office_software : ['Word', 'PowerPoint', 'Excel', 'Access',
                                   'Outlook', 'Visio'],
                certifications : ['Registered Nurse', 'Basic Life Support',
                                  'Translator', 'Scrum Master'],
            }
        },
        experience : {},
        publications : {},
        education : {},
        links : {},
    }
};

$(document).ready(function(){

    const page_2 = $("#p2 div.resume");  // Background section
    const page_3 = $("#p3 div.resume");  // Experience section
    const page_4 = $("#p4 div.resume");  // Publications section
    const page_5 = $("#p5 div.resume");  // Education section
    const page_7 = $("#p7 div.resume");  // Links section

    load_background(page_2);
    load_publications(page_3);
    load_education(page_4);
    load_education(page_5);
    load_links(page_7);
});


function load_background(page){
    // Load background summary text and skills table

    let tag, xpath, sections = [];

    for (id of ['summary', 'skills']) {
        tag = '<div id="' + id + '">';
        xpath = '#p2 div#' + id;

        page.append(tag);
        sections.push($(xpath));
    }

    sections[0].text(data.content.background.summary);
    // page_2_skills.text(data.content.background.skills);

}

function load_experience(page){
    // Load professional experience text

}
function load_publications(page){}
function load_education(page){}
function load_links(page){}

function set_up_header(page, header, previous, next){
    /* Set up the header for each section of the document
     *
     * Parameters
     * ----------
     *      page (object) : Section selection
     *      header (string) : Title to use for the section
     *      previous (string) : Title to use for the previous section
     *      next (string) : Title to use for the next section
     *
     */

     page.append("<h2>");
}
