//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "#FFFFCC"}).animate({backgroundColor: current});
};
var toggleProjects = function(){

};
var init = function(obj){
    $(".tooltippable").tooltip();
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
    //Setup folding cards
    $(".sectionToggleIndicator").tooltip();
    $(".sectionToggle").tooltip();
    $(window.location.hash+"Container").show();
    $(window.location.hash).children(".sectionToggleIndicator").hide();
    $(".sectionToggle").click(function(){
        var targetdiv = $(this).attr("data-reveal");
        console.log(targetdiv);
        $(targetdiv).slideToggle();
        $(targetdiv).children(".sectionToggleIndicator").toggle();
    });
};
$(function(){
    resumedata = $.getJSON("resume.json", function(obj){
        init(obj);
    });
});
