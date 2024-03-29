//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "#FFFFCC"}).animate({backgroundColor: current});
};
var importCV = function(obj, cb){
    //Import Projects
    var projecttemplate = Handlebars.compile($("#project-template").html());
    $("#projects").html(projecttemplate(obj.projects));
    //Import work experience
    var jobtemplate = Handlebars.compile($("#job-template").html());
    var filteredExtracurriculars = obj.extracurricular
    filteredExtracurriculars.entries = filteredExtracurriculars.entries.filter(function(entry){
        return entry.resumeDisplay
    })
    $("#extracurricular").html(jobtemplate(filteredExtracurriculars));
    $("#work").html(jobtemplate(obj.work));
    //Import Abstracts
    var abstractstemplate = Handlebars.compile($("#abstracts-template").html());
    $("#abstracts").html(abstractstemplate(obj.abstracts));
    //Import Publications
    var publicationstemplate = Handlebars.compile($("#publications-template").html());
    $("#publications").html(publicationstemplate(obj.publications));
    //Import Grants
    var grantstemplate = Handlebars.compile($("#grants-template").html());
    console.log(grantstemplate)
    $("#grants").html(grantstemplate(obj.grants));
    
    cb(obj);
};
var initPlugins = function(obj){
    //Setup Modal
    $("#hopeinfo").leanModal({overlay : 0.95, closeButton: ".modal_close"});
    //SMOOTH SCROLLING
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        var highlight = $(this).attr("data-highlight");
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'easeInOutQuart', function () {
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
    //Project link tracking
    $(".projectlink").click(function(){
        $.trigger("projectClick");
    });
    //Slick Carosel
    var proj_opts = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: false,
        mobileFirst: true,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: "<a type='button' class='slickarrow glyphicon glyphicon-chevron-left' style='color: #FFF; position: absolute; height: 100%; left:-40px; font-size: 35px; line-height: 400px;'></a>",
        nextArrow: "<a type='button' class='slickarrow glyphicon glyphicon-chevron-right' style='color: #FFF; position: absolute; height: 100%; right:-40px; font-size: 35px; line-height: 400px; padding-right: 25px; padding-left: 25px;'></a>",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
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
    }
    $("#publicationsContainer").slick(proj_opts);
    proj_opts.prevArrow = "<a type='button' class='slickarrow glyphicon glyphicon-chevron-left' style='color: #333; position: absolute; height: 100%; left:-60px; font-size: 35px; line-height: 350px;'></a>",
    proj_opts.nextArrow =  "<a type='button' class='slickarrow glyphicon glyphicon-chevron-right' style='color: #333; position: absolute; height: 100%; right:-60px; font-size: 35px; line-height: 350px; padding-right: 25px; padding-left: 25px;'></a>",
    $("#abstractsContainer").slick(proj_opts);
    $("#grantsContainer").slick(proj_opts);
    $("#projectsContainer").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: false,
        mobileFirst: true,
        autoplay: false,
        autoplaySpeed: 4000,
        prevArrow: "<a type='button' class='slickarrow glyphicon glyphicon-chevron-left' style='position: absolute; height: 100%; left:-40px; font-size: 35px; line-height: 400px; padding-left: 25px;'></a>",
        nextArrow: "<a type='button' class='slickarrow glyphicon glyphicon-chevron-right' style='position: absolute; height: 100%; right:-40px; font-size: 35px; line-height: 400px; padding-right: 25px;'></a>",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
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
    //Scroll Spy: Changes navbar with scrolling
    $('body').scrollspy({ target: '#navbar' });
    //Tooltips
    $(".tooltippable").tooltip();
};
$(function(){
    cvdata = $.getJSON("cv.json", function(obj){
        importCV(obj, initPlugins);
    });
});
