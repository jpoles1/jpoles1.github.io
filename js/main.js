//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "#FFFFCC"}).animate({backgroundColor: current});
};
var toggleProjects = function(){

};
var init = function(obj){
    $('#projectToggleArrow').tooltip();
    if(window.location.hash=="#projects"){
        $("#projectsContainer").show();
        $("#projectToggleArrow").hide();
    }
    $("#projecttoggle").click(function(){
        $("#projectsContainer").slideToggle();
        $("#projectToggleArrow").toggle();
    });
    $("#hopeinfo").leanModal({overlay : 0.95, closeButton: ".modal_close"});
    var jobtemplate = Handlebars.compile($("#job-template").html());
    $("#extracurricular").html(jobtemplate(obj.extracurricular));
    $("#work").html(jobtemplate(obj.work));
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
            if(target=="#projects"){
                $("#projectsContainer").slideDown();
                $("#projectToggleArrow").hide();
            }
        });
    });
};
$(function(){
    resumedata = $.getJSON("resume.json", function(obj){
        init(obj);
    });
});
