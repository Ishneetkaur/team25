jQuery(window).load(function() {
    jQuery("#loading").fadeOut("10", function () {
        jQuery('#loading img').css("display", "none");
        jQuery('#loading').css("display", "none");
        jQuery('.loading').css("display", "none");
    });
    if(jQuery('.portfolio-popup').length > 0) {
        jQuery('#portfolio-popup .custom').append('<div class="niory_close"><\/div>');
    }
    jQuery('.plazart-mainnav .plazart-megamenu li a').on('click',function(){
        jQuery('.plazart-mainnav .nav-collapse.navbar-collapse').removeClass('in');
    });

	jQuery(document).find('body').addClass('loaded');
    jQuery('.tzgoto-top').click(function(){
        jQuery('body,html').animate({scrollTop:0},800);
    });

    if(jQuery('#tz-slider .flexslider .slides').length > 0) {
        var slider_hieght = jQuery('.tzslider').height();
        TzTemplateResizeImage(jQuery('#tz-slider .flexslider .slides'));
        jQuery('#tz-slider .flexslider .slides').height(slider_hieght);
    }

    function amend() {
        "use strict";
        var height;
        height = jQuery(window).height();
        jQuery('#homepage').css('height', height + 10 + "px");
    }

    amend();
// if user resizes the screen
    jQuery(window).resize(function () {
        amend();
    });

    jQuery('.popup-bk, .niory_close').on('click',function(){
        jQuery('html').css('overflow-y','scroll');
        jQuery('body').removeClass('overlay-scroll');
        jQuery('.ajax-media').empty();
        jQuery('.ajax-content').empty();
        jQuery('.portfolio-popup').css('display','none');
        jQuery('.portfolio-popup .tz-loading').css('display','block');
        jQuery('.ajax-media').css("opacity", 0);
    });
});
jQuery(window).bind('load resize',function(){
    var width_windown   = jQuery(window).width();
    if(width_windown < 797) {
        if((jQuery('.TzArticleBlogInfo').length > 0) && jQuery('.blog_date').length > 0) {
            jQuery('.TzBlogInner .blog_item').each(function(){
                jQuery(this).find('.blog_date').append(jQuery(this).find('.TzArticleBlogInfo'));
            });
        }
    }
});
jQuery(window).bind('load scroll resize',function(){
    /// menu fix

    if(jQuery('#tz-slider .flexslider .slides').length > 0) {
        var slider_hieght = jQuery('.tzslider').height();
        TzTemplateResizeImage(jQuery('#tz-slider .flexslider .slides'));
        jQuery('#tz-slider .flexslider .slides').height(slider_hieght);
    }
    if(jQuery('.TzItemPage.item-page.mCustomScrollbar').length > 0) {
        var height_mc   = jQuery('.TzItemPage.item-page.mCustomScrollbar').height();
        if(jQuery('.mCustomScrollBox .TzArticleMedia').length > 0){
            jQuery('.mCustomScrollBox .TzArticleMedia').height(height_mc);
            TzTemplateResizeImage(jQuery('.mCustomScrollBox .TzArticleMedia'));
        }
    }
});
function fslider() {
    jQuery(document).ready(function(){
        jQuery('.ajax_flexslider').flexslider({
            animation: 'none',
            slideDirection: "horizontal",
            slideshow: true,
            slideshowSpeed: 7000,
            animationDuration: 600,
            directionNav: true,
            controlNav: false,
            prevText: '<i class="fa fa-angle-left"><\/i>',
            nextText: '<i class="fa fa-angle-right"><\/i>',
            pausePlay: false,
            pauseText: "Pause",
            playText: "Play",
            pauseOnAction: true,
            pauseOnHover: false,
            useCSS: true,
            startAt: 0,
            animationLoop: true,
            smoothHeight: true,
            randomize: false,
            itemWidth:0,
            itemMargin:0,
            minItems:0,
            maxItems:0,
            start: function(){
                jQuery(".ajax_flexslider").css("width","100%")
            }
        });
    });
}
function jloading() {
    jQuery(".tz-loading").fadeOut("3000", function () {
        jQuery('.tz-loading').css("display", "none");
        jQuery('.ajax-media').css("opacity", 1);
    });
}
function item_click(url_base){
    jQuery('.TzInner').live('click', function(){
        jQuery('html').css('overflow-y','hidden');
        jQuery('body').addClass('overlay-scroll');
        jQuery('.portfolio-popup').css('display','block');
        var arID = jQuery(this).attr('id');
        jQuery.ajax({
            type: "POST",
            url: ''+url_base+'templates/tz_niory_joomla/html/com_tz_portfolio/portfolio/default_ajax.php',
            data: { itemID: arID, UrlTrue: url_base },
            dataType 	: 'json',
            success 	: function(data) {
                jQuery('.portfolio-popup-content .ajax-media').append(data.html);
                jQuery('.portfolio-popup-content .ajax-content').append(data.html2);
                if(data.type == 'imageGallery') {
                    fslider();
                }
                jQuery('.portfolio-popup').imagesLoaded(function(){
                    jloading();
                });
            }
        });

    });
}