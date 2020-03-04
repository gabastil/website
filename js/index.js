/*
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 *
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 */

 $(document).ready(function(){

    const SECTION_BACKGROUND = $("div[id='professional-experience']");

    let org = new Organization(...['Schreiber', 'Translator', 'Rockville, MD', [2015,2017], ['test', 'line 2']]);

    SECTION_BACKGROUND.ready(function(){
        console.log(org.write_header());
        // SECTION_BACKGROUND.append(org.write_header());
        // SECTION_BACKGROUND.append(org.write_body());
        SECTION_BACKGROUND.append(org.write_organization());
    });

    // Enable scrolling for interactive cv
    $("#cv").click(function(){
        var cv_background = $("#p2");
        var cv_background_top = cv_background.position().top;

        var scrollTo = {top : cv_background_top,
                        left : 0,
                        behavior : 'smooth'};

        window.scrollTo(0, cv_background_top);
    });

    $(document).scroll(function(){
        var cv_y = $("#p3").position().top;
        var pg_y = window.pageYOffset;
        var cv_menu = $(".remote");

        if (pg_y > cv_y + 10) {
            cv_menu.css("visibility", "visible");
        } else {
            cv_menu.css("visibility", "hidden");
        }

    });

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

    // Scroll to Top
    $("a[href='top']").click(function(){
        $("html, body").animate({scrollTop: 0}, 1000);
    });

 })


// Functions

function showExperienceMenu(){
    var doc = window;
    alert(doc.pageYOffset);
}