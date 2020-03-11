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

    const BACKGROUND = $("div[id='background']");
    const EXPERIENCE = $("div[id='experience']");
    const EDUCATION = $("div[id='education']");
    const PUBLICATIONS = $("div[id='publications']");
    const CONTACTS = $("div[id='contacts']");

    const SECTIONS = [BACKGROUND,
                      EXPERIENCE,
                      EDUCATION,
                      PUBLICATIONS,
                      CONTACTS];

    const CLASSES = [Background,
                     Experience,
                     Education,
                     Publications];

    // Main process to populate the HTML document
    for (var i = 0; i < STRINGS.length; i++){
        SECTIONS[i].append(insert_header(STRINGS[i], STRINGS[i + 1]));

        if (i < STRINGS.length - 1){
            SECTIONS[i].append(CLASSES[i].write(RESUME[STRINGS[i]]));
        }
    }

    // Insert section headers
    function insert_header(title, next=null){
        let navigation = `<a id="${title}"></a><a href="top">top</a>`
        if (next != null){
            navigation = `${navigation} <a href="${next}">${next}</a>`;
        }
        return `<h2>${title} ${navigation}</h2>`;
    }

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

    const TOP = $("a[href='top']");
    const BACKGROUND_ = $("a[href='background']");
    const EXPERIENCE_ = $("a[href='experience']");
    const EDUCATION_ = $("a[href='education']");
    const PUBLICATIONS_ = $("a[href='publications']");

    // Scroll to Top
    TOP.click(function(){$("html, body").animate({scrollTop: 0}, 1000);});
    EXPERIENCE_.click(function(){$("html, body").animate({scrollTop: EXPERIENCE.position().top}, 1000);});
    EDUCATION_.click(function(){$("html, body").animate({scrollTop: EDUCATION.position().top}, 1000);});
    PUBLICATIONS_.click(function(){$("html, body").animate({scrollTop: PUBLICATIONS.position().top}, 1000);});

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


// Functions

function showExperienceMenu(){
    var doc = window;
    alert(doc.pageYOffset);
}