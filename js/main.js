//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "#FFFFCC"}).animate({backgroundColor: current});
};
var toggleProjects = function(){

};
var init = function(obj){
    $("#hopeinfo").leanModal({overlay : 0.95, closeButton: ".modal_close"});
    var jobtemplate = Handlebars.compile($("#job-template").html());
    $("#extracurricular").html(jobtemplate(obj.extracurricular));
    $("#work").html(jobtemplate(obj.work));
    var projecttemplate = Handlebars.compile($("#project-template").html());
    $("#projects").html(projecttemplate(obj.projects));
    //Scroll Spy: Changes navbar with scrolling
    $('body').scrollspy({ target: '#navbar' });
    //SMOOTH SCROLLING
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        var highlight = $(this).attr("data-highlight");
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
            if(highlight){
                $(highlight).animateHighlight();
            }
            $target.children(".sectionToggle").click();
        });
    });
    //Project Overlays
    $(".projimg").hover(function(){
        $(this).children(".projoverlay").finish().slideDown();
    }, function(){
        $(this).children(".projoverlay").finish().slideUp();
    });
    //Slick Carosel
    $("#projectsContainer").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: false,
        mobileFirst: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: "<a type='button' class='glyphicon glyphicon-chevron-left' style='position: absolute; height: 100%; left:-25px; font-size: 35px; line-height: 300px;;'></a>",
        nextArrow: "<a type='button' class='glyphicon glyphicon-chevron-right' style='position: absolute; height: 100%; right:-25px; font-size: 35px; line-height: 300px;'></a>",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    });
    $(".tooltippable").tooltip();
};
$(function(){
    resumedata = $.getJSON("resume.json", function(obj){
        init(obj);
    });
});
