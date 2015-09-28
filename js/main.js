//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "#FFFFCC"}).animate({backgroundColor: current});
};
var init = function(obj){
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
        });
    });
};
$(function(){
    resumedata = $.getJSON("resume.json", function(obj){
        init(obj);
    });
});