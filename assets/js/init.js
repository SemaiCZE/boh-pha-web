(function($) {
  $(function() {
    $('.sidenav').sidenav();

    $('.carousel').carousel({
      fullWidth: true,
      indicators: true,
      duration: 300
    });

    // hack to properly set initial height of the carousel
    $('.carousel.carousel-slider')
      .find('.carousel-item img')
      .load(function() {
        $('.carousel.carousel-slider').height($(this).height());
      });

    var carouselAutoplay = function() {
      return setInterval(function() {
        $('.carousel').carousel('next');
      }, 4000);
    };
    var autoplayInstance = carouselAutoplay();

    $('.carousel').hover(
      function() {
        clearInterval(autoplayInstance);
      },
      function() {
        clearInterval(autoplayInstance);
        autoplayInstance = carouselAutoplay();
      }
    );

    // move next carousel
    $('.moveNextCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('next');
      clearInterval(autoplayInstance);
      autoplayInstance = carouselAutoplay();
    });

    // move prev carousel
    $('.movePrevCarousel').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.carousel').carousel('prev');
      clearInterval(autoplayInstance);
      autoplayInstance = carouselAutoplay();
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
