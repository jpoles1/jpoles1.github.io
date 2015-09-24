$(function(){
    adjheights("#edd .col-md-4");
    window.onresize = function(event){
        adjheights("#edd .col-md-4");
    };
});
var adjheights = function(elem){
    var heights = $(elem).map(function() {
        return $(this).height();
    }).get(),
    maxHeight = Math.max.apply(null, heights);
    $(elem).height(maxHeight);
};