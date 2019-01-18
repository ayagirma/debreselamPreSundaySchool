$(function() {
 
  "use strict";
  //activate Scrollspy

  var topoffset = 48; //variable for menu height
  var slideqty = ('#visison .item').length;
  var wheight =$(window).height();// get the height of the window
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#vision .item').eq(randSlide).addClass('active');
  
  $('.fullheight').css('height', wheight);// set to window target height
  
  //replace IMG inside caresouls with background image
  $('#vision .item img').each(function(){
  	var imgSrc= $(this).attr('src');
  	$(this).parent().css({'background-image': 'url('+imgSrc+')'});
  	$(this).remove();
  });

 // adjust height of .fullheight elements on window resize
 $(window).resize(function(){
 	wheight = $(window).height();// get the height os the window
 	$('.fullheight').css('height', wheight); //set to window
 });


  // activity scrollspy
  $('body').scrollspy({
  	target: 'header.navbar',
  	offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#vision'){
	 	$('header nav').addClass('inbody');
	    }else{
	 	  $('header nav').removeClass('inbody');
	    }

// go to the dom and find a list element that is active
// class and lookfor a anchor tag then look attribute href
	 $('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
	 	var hash = $(this).find('li.active a').attr('href');
	   if(hash !== '#vision'){
	     $('header nav').addClass('inbody');
	     }else{
	 	     $('header nav').removeClass('inbody');
	     }
	  });

//use smooth scrolling when clicking on navigation
     //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

// automatically generated carousel indicators
  for(var i=0; i<slideqty; i++){
  	var insertText = '<li data-target = "#vision" data-slide-to = "' + i + '"';
  	if(i===randSlide){

  	      insertText += 'class="active" ';
  	    }
  	    insertText += '></li>';
    	$('#vision ol').append(insertText);
   }


	$('.carousel').carousel({
      pause:false
	  });
	});