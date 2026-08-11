$(function () {

  "use strict";

  var topoffset = 48;                               // menu height offset
  var slideqty  = $('#vision .item').length;        // number of carousel slides
  var wheight   = $(window).height();               // viewport height
  var randSlide = Math.floor(Math.random() * slideqty);

  // Start the carousel on a random slide
  $('#vision .item').eq(randSlide).addClass('active');

  // Make the carousel fill the viewport height
  $('.fullheight').css('height', wheight);

  // Replace <img> inside the carousel with a CSS background image
  $('#vision .item img').each(function () {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({ 'background-image': 'url(' + imgSrc + ')' });
    $(this).remove();
  });

  // Keep the carousel full-height on resize
  $(window).resize(function () {
    wheight = $(window).height();
    $('.fullheight').css('height', wheight);
  });

  // Scrollspy
  $('body').scrollspy({ target: 'header.navbar', offset: topoffset });

  // Toggle the "inbody" nav style based on the active section
  function syncInbody() {
    var hash = $('header.navbar').find('li.active a').attr('href');
    $('header nav').toggleClass('inbody', hash !== '#vision');
  }
  syncInbody();
  $('.navbar-fixed-top').on('activate.bs.scrollspy', syncInbody);

  // Smooth scrolling for in-page navigation
  $('.navbar a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top - topoffset + 2 }, 500);
        return false;
      }
    }
  });

  // Build carousel indicator dots
  for (var i = 0; i < slideqty; i++) {
    var dot = '<li data-target="#vision" data-slide-to="' + i + '"';
    if (i === randSlide) { dot += ' class="active"'; }
    dot += '></li>';
    $('#vision ol').append(dot);
  }

  $('.carousel').carousel({ pause: false });

  // Keep the footer copyright year current
  $('#copyrightYear').text(new Date().getFullYear());

});
