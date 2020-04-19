/**
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * All functions are encapsulated in the $(document).ready() call.
 * The sections of this call are as follows:
 *      1. Populate Text
 *      2. Populate SVG
 *      3. Functionality - Navigation
 *      4. Functionality - Interactivity
 *
 * Variables from other scripts:
 *      1. RESUME is a JSON constant with resume data from the script
 *         resume_resource.js
 *      2. Functions and drawings from animation.js are automatically launched.
 */

$(document).ready(function(){
    /**
     * 1. POPULATE TEXT FUNCTIONS
     *
     * This section contains procedures and functions to populate the HTML
     * document with HTML blocks that show content.
     */

    const STRINGS = ['background',
                     'experience',
                     'education',
                     'publications',
                     'resources',
                     null];

    const CLASSES = [Background,
                     Experience,
                     Education,
                     Publications,
                     Resources];

    const SECTIONS = [];

    let i, section, header, content;

    // Main process to populate the HTML document
    for (i in STRINGS){
        i = parseInt(i);
        if (i === STRINGS.length - 1){
            break;
        } else {
            header = insert_header(STRINGS[i], STRINGS);
            content = CLASSES[i].write(RESUME[STRINGS[i]]);

            section = $(`div[id='${STRINGS[i]}']`);
            section.append(header, content);
            SECTIONS.push(section);
        }
    }

    const [BACKGROUND, EXPERIENCE, EDUCATION, PUBLICATIONS, CONTACTS] = SECTIONS;
    insert_landing_page_title();
    insert_static_banner();

    /**
     * 2. POPULATE SVG FUNCTIONS
     *
     * This section contains procedures and functions to draw on the SVG canvas
     *
     */


    /**
     * 3. FUNCTIONALITY - NAVIGATION
     *
     * This section contains procedures and functions to draw on the SVG canvas
     *
     */

    const TOP = $("a[href='#top']");
    const NAV_ABOUT = $("a[id='menu-about']");
    const BACKGROUND_ = $("a[href='#background']");
    const EXPERIENCE_ = $("a[href='#experience']");
    const EDUCATION_ = $("a[href='#education']");
    const PUBLICATIONS_ = $("a[href='#publications']");

    TOP.click(scrollTo);
    NAV_ABOUT.click(scrollToBackground);
    EXPERIENCE_.click(scrollToExperience);
    EDUCATION_.click(scrollToEducation);
    PUBLICATIONS_.click(scrollToPublications);

    /**
     * 4. FUNCTIONALITY - INTERACTIVITY
     *
     * This section contains procedures and functions to enable interactivity
     *
     */
    let banner = $('.banner'),
        background = $('#background'),
        experience = $('#experience'),
        education = $('#education'),
        publications = $('#publications'),
        resources = $('#resources')
        ;
    banner.hide();

    // Visibility of the banner on scroll
    $(window).on('scroll', function(){
       let header = $('div[id="header"]');
       let threshold = header.position().top + header.height();
       let position = $(window).scrollTop();
       if (position >= threshold){
           banner.show();
       } else {
           banner.hide();
       }

       // console.log(pageLocationBetween(background, experience));

       // let position1 = [background.position().top, experience.position().top],
       //     position2 = [experience.position().top, education.position().top],
       //     position3 = [education.position().top, publications.position().top],
       //     position4 = [publications.position().top, resources.position().top],
       //     position5 = [resources.position().top, $(window).height()];

       // if (pageLocationBetween(...position1)) {
       //      updateBannerMenu('background');
       // } else if (pageLocationBetween(...position2)){
       //      updateBannerMenu('experience');
       // } else if (pageLocationBetween(...position3)){
       //      updateBannerMenu('education');
       // } else if (pageLocationBetween(...position4)){
       //      updateBannerMenu('publications');
       // } else if (pageLocationBetween(...position5)){
       //      updateBannerMenu('resources');
       // }

       let positions = [
                        [background.position().top, experience.position().top],
                        [experience.position().top, education.position().top],
                        [education.position().top, publications.position().top],
                        [publications.position().top, resources.position().top],
                        [resources.position().top, $(window).height()]
                       ];

        for (i in STRINGS){
            i = parseInt(i);
            if (pageLocationBetween(...positions[i])){
                updateBannerMenu(STRINGS[i]);
            }
        }
    });


    $(".skill li").hover(toggle_checkmark);
})

const EMOJI = {
                arrow_up : { hex : '\u2b06\ufe0f', html : '&#x2b06;&#xfe0f;'},
                arrow_down : { hex : '\u2b07\ufe0f', html : '&#x2b07;&#xfe0f;'},
                checkmark : { hex : '\u2714\ufe0f', html : '&#x2714;&#xfe0f;'},
                point_left : { hex : '\ud83d\udc48', html : '&#xd83d;&#xdc48;'}
              };

const MENU = {
                About : '#background',
                CV : "#experience",
                LinkedIn : 'https://www.linkedin.com/in/glennabastillas/',
                GitHub : 'https://github.com/gabastil',
                Viz : "https://gabastil.github.io/odi-covid-19",
                Research : 'https://doi.org/10.1007/978-981-10-8468-3'
             };

const MENU_BANNER = {
                        Home : '#top',
                        Background : '#background',
                        Experience : '#experience',
                        Education : '#education',
                        Publications : '#publications',
                        Resources : '#resources',
                    };

/**
 * Insert the main title of the webpage and navigation links
 *
 * @param {string} title - Main landing page title. Default is "Glenn Abastillas"
 */
function insert_landing_page_title(title = "Glenn Abastillas"){
    let header = $("div[id='header']");
    let menu_item;

    header.append(`<h1>${title}</h1>`);

    for (let i in MENU){
        menu_item = `<a id='menu-${i.toLowerCase()}' href='${MENU[i]}'>`;
        menu_item = `${menu_item}${i}</a>`;
        header.append(menu_item);
    }
}

/**
 * Insert the fixed bannerto webpage starting in background
 *
 * @param {string} title - Main landing page title. Default is "Glenn Abastillas"
 */
function insert_static_banner(title = "Glenn Abastillas", links=undefined){
    let banner = $("div[id='banner']");
    let menu_item;

    banner.append(`<span><a href='#top'>${title}</a></span>`);

    for (let i in MENU_BANNER){
        if (['About', 'CV'].indexOf(i) > -1){
            continue;
        }

        menu_item = `<a id='menu-${i.toLowerCase()}' href='${MENU_BANNER[i]}'>`;
        menu_item = `${menu_item}${i}</a>`;
        banner.append(menu_item);
    }
}

/**
 * Insert section headers for each "page" or "section" on the website with links
 * for going to the top of the page or to the top of various sections.
 *
 * @param {string} title - Section name
 * @param {string} next - Next section name for linking.
 *
 */
function insert_header(title = "contacts", next = null){
    let navigation = `<a id="${title}"></a>`;

    // if (next != null){
    //     for (let item of next){
    //         if (item != title && item != null){
    //             navigation = `${navigation}<a href="#${item}"> | ${item}</a>`;
    //         }
    //     }
    // }
    // navigation += `<a href="#top">| ${EMOJI.arrow_up.hex}</a>`;
    title = title[0].toUpperCase() + title.slice(1);
    return `<h2>${title} ${navigation}</h2>`;
}

/**
 * Add and remove a character from the end of a string
 * @param {string} character - the character to toggle on a string
 */
function toggle_character(object, character){
    let text = object.text();

    // console.log(`${text} and character is ${character}`);

    if (text.endsWith(character)) {
        text = text.replace(character, '');
    } else {
        text = `${text} ${character}`;
    }
    object.text(text);
}

/**
 * Toggle a checkmark emoji from the end of a string
 */
function toggle_checkmark(){
    toggle_character($(this), EMOJI.checkmark.hex);
}

/**
 * Toggle a point_left emoji from the end of a string
 */
function toggle_point_left(){
    toggle_character($(this), EMOJI.point_left.hex);
}

/**
 * Toggle a arrown_down emoji from the end of a string
 */
function toggle_arrown_down(){
    toggle_character($(this), EMOJI.arrown_down.hex);
}

/**
 * Toggle a arrow_up emoji from the end of a string
 */
function toggle_arrow_up(){
    toggle_character($(this), EMOJI.arrow_up.hex);
}

/**
 * Automatically scroll the screen to a predetermined spot on the page.
 *
 * @param {event} - default argument passed through
 * @param {integer} location - Y coordinate of the screen to scroll to.
 * @param {integer} duration - length of time to animate scroll
 */
function scrollTo(e, selection = 0, duration = 500){
    let body = $("html, body"), banner = $("div[id='banner']");
    body.animate({scrollTop : selection - banner.height(), duration});
}

/**
 * Automatically scroll to the background section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToBackground(e, id = "background", duration = 500){
    scrollTo(e, $(`div[id='${id}']`).position().top, duration);
}

/**
 * Automatically scroll to the experience section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToExperience(e, id = "experience", duration = 500){
    scrollTo(e, $(`div[id='${id}']`).position().top, duration);
}

/**
 * Automatically scroll to the education section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToEducation(e, id = "education", duration = 500){
    scrollTo(e, $(`div[id='${id}']`).position().top, duration);
}

/**
 * Automatically scroll to the publications section
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToPublications(e, id = "publications", duration = 500){
    scrollTo(e, $(`div[id='${id}']`).position().top, duration);
}

/**
 * Determine if the viewer is between two different sections in the document
 * @param {selection} current - name of current section the viewer could be in
 * @param {selection} next - name of next section the viewer could be in
 * @returns {boolean} True if the viewer is on the current section, else False
 */
function pageLocationBetween(current, next){
    let top = $(window).scrollTop(), banner = $('.banner').height() * 5;
    return (top > current - banner && top <= next - banner);
}


/**
 * Determine if the viewer is between two different sections in the document
 * @param {string} href - name of href link to update in the banner
 */
function updateBannerMenu(href){
    let banner = $(`.banner a[href="#${href}"]`),
        others = $(`.banner a[href!="#${href}"]`);

    banner.css('text-decoration', 'underline');
    others.css('text-decoration', 'none');
}
