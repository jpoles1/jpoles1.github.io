//Highlight Effect
var notLocked = true;
$.fn.animateHighlight = function() {
    var current = this.css( 'background-color' );
    this.animate({backgroundColor: "yellow"}).animate({backgroundColor: current});
};
$(function(){
    resumedata = $.getJSON("resume.json", function(obj){
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
    });
});