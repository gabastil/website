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
 *      2.
 *
 *
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
                     'contacts'];

    const CLASSES = [Background, Experience, Education, Publications];
    const SECTIONS = [];

    let i, section;

    // Main process to populate the HTML document
    for (i in STRINGS){
        section = $(`div[id='${STRINGS[i]}']`);
        i = parseInt(i);

        // Add Section headers and section content with classes from resume.js
        if (i < STRINGS.length - 1){
            section.append(insert_header(STRINGS[i], STRINGS[i + 1]));
            section.append(CLASSES[i].write(RESUME[STRINGS[i]]));
        }
        SECTIONS.push(section);
    }

    const [BACKGROUND, EXPERIENCE, EDUCATION, PUBLICATIONS, CONTACTS] = SECTIONS;


    /**
     * 2. POPULATE SVG FUNCTIONS
     *
     * This section contains procedures and functions to draw on the SVG canvas
     *
     */

    // --- draw_svg_on_landing_page();


    /**
     * 3. FUNCTIONALITY - NAVIGATION
     *
     * This section contains procedures and functions to draw on the SVG canvas
     *
     */
    insertHeader();

    const TOP = $("a[href='#top']");
    const NAV_ABOUT = $("a[id='menu-about']");
    const BACKGROUND_ = $("a[href='#background']");
    const EXPERIENCE_ = $("a[href='#experience']");
    const EDUCATION_ = $("a[href='#education']");
    const PUBLICATIONS_ = $("a[href='#publications']");

    NAV_ABOUT.click(scrollToBackground);

    // Scroll to Top
    TOP.click(scrollTo);
    EXPERIENCE_.click(scrollToExperience);
    EDUCATION_.click(scrollToEducation);
    PUBLICATIONS_.click(scrollToPublications);

    // Enable scrolling for interactive cv
    $("#cv").click(function(){
        var cv_background = $("#p2");
        var cv_background_top = cv_background.position().top;

        var scrollTo = {top : cv_background_top,
                        left : 0,
                        behavior : 'smooth'};

        window.scrollTo(0, cv_background_top);
    });


    /**
     * 4. FUNCTIONALITY - INTERACTIVITY
     *
     * This section contains procedures and functions to enable interactivity
     *
     */

     // [DEPRECATE] Function for a floating navigation bar
    // $(document).scroll(function(){
    //     var cv_y = $("#p3").position().top;
    //     var pg_y = window.pageYOffset;
    //     var cv_menu = $(".remote");

    //     if (pg_y > cv_y + 10) {
    //         cv_menu.css("visibility", "visible");
    //     } else {
    //         cv_menu.css("visibility", "hidden");
    //     }

    // });

    $("rect").hover(function() {
        $(this).attr("old_fill", $(this).attr("fill"));
        $(this).attr("fill", "red");
    }, function() {
        $(this).attr("fill", $(this).attr("old_fill"));
    });

    let about_menu = $("#pulldown");

    // Toggle 'about' menu visibility
    $('a[id="about"]').hover(function(){
        about_menu.slideDown();
    },
    function(){
        about_menu.hover(function(){
            $(this).stop();
        }, function(){
            $(this).slideUp();
            });
        });

})

/**
 * Insert the main title of the webpage and navigation links
 *
 * @param {string} title - Main landing page title. Default is "Glenn Abastillas"
 */
function insertHeader(title = "Glenn Abastillas"){
    let header = $("div[id='header']");
    let labels = {About : '#background',
                  LinkedIn : 'https://www.linkedin.com/in/glennabastillas/',
                  GitHub : 'https://github.com/gabastil',
                  Visualization : null};
    let menu_item;

    header.append(`<h1>${title}</h1>`);

    for (let i in labels){
        menu_item = `<a id='menu-${i.toLowerCase()}' href='${labels[i]}'>`;
        menu_item = `${menu_item}${i}</a>`;
        header.append(menu_item);
    }
}

/**
 * Automatically scroll the screen to a predetermined spot on the page.
 *
 * @param {event} - default argument passed through
 * @param {integer} location - Y coordinate of the screen to scroll to.
 * @param {integer} duration - length of time to animate scroll
 */
function scrollTo(e, selection = 0, duration = 1000){
    let body = $("html, body");
    body.animate({scrollTop : selection.position().top, duration});
}

/**
 * Automatically scroll to the background section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToBackground(e, id = "background", duration = 1000){
    scrollTo(e, $(`div[id='${id}']`), duration);
}

/**
 * Automatically scroll to the experience section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToExperience(e, id = "experience", duration = 1000){
    scrollTo(e, $(`div[id='${id}']`), duration);
}

/**
 * Automatically scroll to the education section
 *
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToEducation(e, id = "education", duration = 1000){
    scrollTo(e, $(`div[id='${id}']`), duration);
}

/**
 * Automatically scroll to the publications section
 * @param {event} - default argument passed through
 * @param {string} location - name of div to scroll to top of
 * @param {integer} duration - lenght of time to animate scroll
 */
function scrollToPublications(e, id = "publications", duration = 1000){
    scrollTo(e, $(`div[id='${id}']`), duration);
}


// Insert section headers
/**
 * Insert section headers for each "page" or "section" on the website with links
 * for going to the top of the page or to the top of various sections.
 *
 * @param {string} title - Section name
 * @param {string} next - Next section name for linking.
 *
 */
function insert_header(title, next=null){
    let navigation = `<a id="${title}"></a><a href="#top">top</a>`
    if (next != null){
        navigation = `${navigation} <a href="#${next}">${next}</a>`;
    }
    return `<h2>${title} ${navigation}</h2>`;
}

/**
 * [TO BE DEVELOPED or DEPRECATED]
 */
function showExperienceMenu(){
    var doc = window;
    alert(doc.pageYOffset);
}