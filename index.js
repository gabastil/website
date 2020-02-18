/*
 * Filename: index.js
 * Author: Glenn Abastillas
 * Date: February 18, 2020
 * 
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 */

 $(document).ready(function()
 {
    // Enable scrolling for interactive cv
    $("#cv").click(function(){
        var cv_background = $("#p2");
        var cv_background_top = cv_background.position().top;

        var scrollTo = {top : cv_background_top,
                        left : 0,
                        behavior : 'smooth'};

        window.scrollTo(0, cv_background_top);
    });

 })