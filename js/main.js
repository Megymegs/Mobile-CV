if ($(window).width() < 1092) {
    $('.navbar').hide(); 
    $(".info-holder p").fadeOut(4000, 0, function(){
        $(this).fadeOut();
        $('.overlay img').css('filter', 'grayscale(0)');
   });
   $('.About').click(function(){
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #About, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'fixed');
        $('#Education, #Skills, #Careers, #Portfolio, .landing-page, #Contact').css('display', 'none');
    });

    
    $('.Education').click(function () {
        $('#loading').fadeIn();
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #Education, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'relative');
        $('#About, #Skills, #Careers, #Portfolio, .landing-page, #Contact').css('display', 'none');
    });

    $('.Skills').click(function () {
        $('#loading').fadeIn();
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #Skills, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'fixed');
        $('#Education, #About, #Careers, #Portfolio, .landing-page, #Contact').css('display', 'none');
    });

    $('.Careers').click(function () {
        $('#loading').fadeIn();
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #Careers, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'relative');
        $('#Education, #Skills, #About, #Portfolio, .landing-page, #Contact').css('display', 'none');
    });

    $('.Portfolio').click(function () {
        $('#loading').fadeIn();
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #Portfolio, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'fixed');
        $('#Education, #Skills, #About, #Careers, .landing-page, #Contact').css('display', 'none');
    });

    $('.Contact').click(function () {
        $('#loading').fadeIn();
        $('.landing-page, nav, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav, #Contact, footer').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'fixed');
        $('#Education, #Skills, #About, #Careers, .landing-page, #Portfolio').css('display', 'none');
    });

    $('#mobileAbout, #mobileEducation, #mobileSkills, #mobileCareers, #mobilePortfolio, #mobileContact').click(function() {
        if($('.navbar-collapse').hasClass('show')){
            $('.navbar-collapse').removeClass('show');
        }else{
            $('.navbar-collapse').addClass('show');
        }
    });

    $('#view-hand-drawings').click(function () {
        $('#Portfolio .row .col-sm-6').fadeOut();
        $('.gallery, .handDrawings').delay(400).fadeIn();
    });

    $('.return-hand').click(function () {
        $('.gallery, .handDrawings').fadeOut();
        $('#Portfolio .row .col-sm-6').delay(400).fadeIn();
    });

    $('#view-college-projects').click(function () {
        $('#Portfolio .row .col-sm-6').fadeOut();
        $('.gallery2, .collegeProjects').delay(400).fadeIn();
    });

    $('.return-hand').click(function () {
        $('.gallery2, .collegeProjects').fadeOut();
        $('#Portfolio .row .col-sm-6').delay(400).fadeIn();
    });

}else{
    $('.navbar').hide();   

    $('.About,.Education, .Skills , .Careers, .Portfolio, .Contact').click(function(){
        $('.landing-page, footer').css('display', 'none');
        $('#loading').fadeIn();
        $('#loading').delay(2800).fadeOut();
        $('#mainBody, nav').delay(3000).fadeIn();
        $('.landing-page .bg-img .info-holder a').css({
            'transition': '3s',
            '-webkit-transition': '3s',
            '-moz-transition': '3s'
        });
        $('footer').css('position', 'relative');
        $('footer').delay(3000).fadeIn();
    });



    $(function () {
        $("#Nav1").click(function () {
            $("html,body").animate({
                scrollTop: $("#top_column").offset().top
            }, "5000");
            return false
        })
    });

    $(function () {
        $("#Nav2").click(function () {
            $("html,body").animate({
                scrollTop: $("#education").offset().top
            }, "5000");
            return false
        })
    });

    $(function () {
        $("#Nav3").click(function () {
            $("html,body").animate({
                scrollTop: $("#skills").offset().top
            }, "5000");
            return false
        })
    });

    $(function () {
        $("#Nav4").click(function () {
            $("html,body").animate({
                scrollTop: $("#work").offset().top
            }, "5000");
            return false
        })
    });

    $(function () {
        $("#Nav5").click(function () {
            $("html,body").animate({
                scrollTop: $("#portfolio").offset().top
            }, "5000");
            return false
        })
    });

    $(function () {
        $("#Nav6").click(function () {
            $("html,body").animate({
                scrollTop: $("#contact").offset().top
            }, "5000");
            return false
        })
    });
}


$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
    } else {
        $('.scrolltop').stop(true, true).fadeOut();
    }
});
$(function () {
    $(".scroll").click(function () {
        $("html,body").animate({
            scrollTop: $("#mainBody").offset().top
        }, "3000");
        return false
    })
});

$('.Home').click(function(){
    $('#loading').fadeIn();
    $('#mainBody, nav').fadeOut();
    setTimeout(function(){location.reload();},1000);
});

