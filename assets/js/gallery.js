(function($) {
  $('.gallery-parent').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true }
    });
  });
})(jQuery); // end of jQuery name space
