/*
 * Filename: dataviz_frame.js
 * Author: Glenn Abastillas
 * Date: February 25, 2020
 *
 * JavaScript functionality for pages under the domain name
 * www.glennabastillas.com
 *
 * This module loads resume content onto the HTML.
 *
 */

 $(document).ready(function(){
    // const MENU_ICON = $("svg[id='menu-icon']");
    // console.log($(MENU_ICON).width());
    // console.log($(MENU_ICON).height());

    draw_menu_icon();
 });

 /**
  * Draw the three stripe menu icon
  * @params {float} buffer - percent of the icon area without graphics
  * @params {int} nstripes - number of stripes to draw
  */
 function draw_menu_icon(buffer = 0.20, nstripes=3){
    const MENU_ICON = $("svg[id='menu-icon']");
    const MENU_ICON_ = d3.select("svg[id='menu-icon']");
    const H = $(MENU_ICON).width(),
          W = $(MENU_ICON).height();

    const STRIPE_HEIGHT = (H - (H * 3 * buffer)) / nstripes;
    const STRIPE_PADDING = (H - (H * 3 * buffer)) - STRIPE_HEIGHT;

    console.log(`stripe_height : ${STRIPE_HEIGHT}\tstripe_padding : ${STRIPE_PADDING}`);

    MENU_ICON_.selectAll("rect")
      .data([STRIPE_HEIGHT, STRIPE_HEIGHT, STRIPE_HEIGHT])
      .enter()
      .append("rect")
      .attr("x", W * buffer)
      .attr("y", function(d, i){return d * (i + 1) + (i > 0 ? STRIPE_PADDING : 0)})
      .attr("height", function(d){return d})
      .attr("width", W * (1 - buffer))
      .attr("fill", 'black');
 }