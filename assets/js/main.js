
// ON DOCUMENT READY
// -----------------------------------------------------------------------------
$(document).ready(function () {

    function doSlider () {
        $('.tweet-slider.flexslider').flexslider({
            animation: "slide",
            direction: "horizontal",
            slideshow: true,
            slideshowSpeed: 3500,
            animationDuration: 500,
            prevText: "",
            nextText: "",
            directionNav: true,
            controlNav: true
        });
    }

    // Twitter - sidebar
    // -----------------------------------------------------------------------------
    if ($('#twitter').length) {
        $.getJSON('twitter.php?url='+encodeURIComponent('statuses/user_timeline.json?screen_name=dxthemes&count=3'), function(tweets){
            $("#twitter").html(tz_format_twitter(tweets));
        });
        setTimeout(function () { doSlider(); }, 5000);
    } else {}

    // Twitter - footer
    // -----------------------------------------------------------------------------
    if ($('#twitter-foot').length) {
        $.getJSON('twitter.php?url='+encodeURIComponent('statuses/user_timeline.json?screen_name=dxthemes&count=3'), function(tweets){
            $("#twitter-foot").html(tz_format_twitter(tweets));
        });
    } else {}

    // FlexSlider
    // -----------------------------------------------------------------------------
    $('.main-slider.flexslider, .testimonial-slider.flexslider').flexslider({
        animation: "slide",
        direction: "horizontal",
        slideshow: false,
        slideshowSpeed: 3500,
        animationDuration: 500,
        prevText: "",
        nextText: "",
        directionNav: true,
        controlNav: true
    });

    // hover
    $(".portfolio .thumbnail").hover(function (){
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });

    // intro image
    function mainImage() {
        $('#home').css({height: $(window).height()-41});
    }
    mainImage();

    function do_parallax() {
        $(window).scroll(function () {
            var yPos = -($(window).scrollTop() / 0.6);
            var coords = '100% ' + yPos + 'px';
            $('.intro-parallax').css({ backgroundPosition: coords });
        });
    }
    do_parallax();

    // make main menu sticky
    if ( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $("nav").sticky({topSpacing: 0});
    } else {}

    // Main menu
    // -----------------------------------------------------------------------------
    (function() {
        var $menu = $('.navbar-inner ul.nav'),
            optionsList = '<option value="" selected>Menu...</option>';
        $menu.find('li').each(function() {
            var $this   = $(this),
                $anchor = $this.children('a'),
                depth   = $this.parents('ul').length - 1,
                indent  = '';
            if( depth ) {
                while( depth > 0 ) {
                    indent += ' - ';
                    depth--;
                }
            }
            optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
        }).end().after('<select class="res-menu">' + optionsList + '</select>');

        $('.res-menu').on('change', function() {
            window.location = $(this).val();
        });
    })();



    // Parallax
    // -----------------------------------------------------------------------------
    $(window).bind('resize', function () {
        mainImage();
        do_parallax();
    });
    if ( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.parallax .bg1').parallax("100%", 0.3);
        $('.parallax .bg2').parallax("100%", 0.3);
        $('.parallax .bg3').parallax("100%", 0.3);
    } else {}

    // Smooth scrolling
    // -----------------------------------------------------------------------------
    $("nav a, .scroll-to").click(function () {

        var headerH = $('nav').outerHeight();
        $(".main-menu a").removeClass('active');
        $(this).addClass('active');
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - headerH + "px"
        }, {
            duration: 1200,
            easing: "easeInOutExpo"
        });
        return false;
    });

    // prettyPhoto
    // -----------------------------------------------------------------------------
    $("a[data-rel^='prettyPhoto']").prettyPhoto();
    $('.prettyPhoto').prettyPhoto();
    $('.ico-zoom').prettyPhoto();

    // Portfolio / isotope
    // -----------------------------------------------------------------------------

    // isotope settings
    // cache container
    var $container = $('#portfolio-grid');

    // initialize isotope
    $container.isotope({
        // options...
        itemSelector : 'article'
        //,resizable: false,
        //masonry: { columnWidth: $container.width() / 12 }
        //, layoutMode : 'fitRows'
    });

    // update columnWidth on window resize
    $(window).smartresize(function(){
        $container.isotope({
            // update columnWidth to a percentage of container width
            //masonry: { columnWidth: $container.width() / 12 }
        });
    });

    // filter items when filter link is clicked
    $('#filtrable a').click(function(){
        var selector = $(this).attr('data-filter');
        $container.isotope({ filter: selector });
        // mark current li
        $(this).parent().parent().find('.current').removeClass('current');
        $(this).parent().addClass('current');
        return false;
    });

    // Relocate
    function relocate() {
        setTimeout("$('#portfolio-grid').isotope('reLayout')",300);
        //$('.prettyPhoto').prettyPhoto();
        $('.ico-zoom').prettyPhoto();
    }
    $(window).load(function(){ relocate(); });
    $(window).resize(function(){ relocate(); });

    // Placeholder
    // -----------------------------------------------------------------------------
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur().parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });

});
