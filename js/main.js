$(function(){
    $('body').scrollspy({ target: '#navbar' })
    //adjheights("#edd .col-md-4");
    window.onresize = function(event){
        //adjheights("#edd .col-md-4");
    };
    //SMOOTH SCROLLING
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});
var adjheights = function(elem){
    var heights = $(elem).map(function() {
        return $(this).height();
    }).get(),
    maxHeight = Math.max.apply(null, heights);
    $(elem).height(maxHeight);
};