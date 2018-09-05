(function($){
  $(function(){

    $('.sidenav').sidenav();

    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      duration: 300
    });
    setInterval(function() {
      $('.carousel').carousel('next');
    }, 4000);

  }); // end of document ready
})(jQuery); // end of jQuery name space
