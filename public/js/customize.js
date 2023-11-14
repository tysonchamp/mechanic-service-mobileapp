$(document).on("scroll", function(){
	if
  ($(document).scrollTop() > 60){
	  $("#banner").addClass("shrink");
	}
	else
	{
		$("#banner").removeClass("shrink");
	}
});

//---- Fixed Header Script End ---//

$(document).ready(function() {
	  var owl = $('#slide');
	  owl.owlCarousel({
		margin: 10,
		autoplay:true,
		dots: true,
		nav: false,
		loop: false,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  })
	  
	  
	  var owl = $('#category-slide');
	  owl.owlCarousel({
		margin: 20,
		autoplay:true,
		dots: true,
		nav: false,
		loop: true,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  })
	  
	  var owl = $('#product-slide');
	  owl.owlCarousel({
		margin: 20,
		autoplay:true,
		dots: true,
		nav: false,
		loop: true,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 1
		  },
		  1000: {
			items: 1
		  }
		}
	  })
	  
	  var owl = $('#multi-slide, #multi-slide-2');
	  owl.owlCarousel({
		margin: 20,
		autoplay:false,
		dots: false,
		nav: false,
		loop: false,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 3
		  },
		  600: {
			items: 3
		  },
		  1000: {
			items: 3
		  }
		}
	  })
	  
	  var owl = $('#multi-slide-3');
	  owl.owlCarousel({
		margin: 20,
		autoplay:false,
		dots: false,
		nav: false,
		loop: false,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 2
		  },
		  600: {
			items: 2
		  },
		  1000: {
			items: 3
		  }
		}
	  })
	  
	  var owl = $('#multi-slide-shop');
	  owl.owlCarousel({
		margin: 20,
		autoplay:true,
		dots: false,
		nav: false,
		loop: false,
		navText : ['<ion-icon name="arrow-back-outline"></ion-icon>','<ion-icon name="arrow-forward-outline"></ion-icon>'],
		autoplayHoverPause:false,
		responsive: {
		  0: {
			items: 2
		  },
		  600: {
			items: 2
		  },
		  1000: {
			items: 2
		  }
		}
	  })
	  
});

$(document).ready(function () {
	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').addClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});
});

$("#search-btn").click(function(){
  $(".search-box").show();
  $("#back-to").hide();
  $('.overlay').addClass('active');
  $('.overlay').addClass('zindex');
});

$(".back").click(function(){
  $(".search-box").hide();
  $('.overlay').removeClass('active');
  $('.overlay').removeClass('zindex');
  $("#back-to").show();
});

$(".overlay").click(function(){
  $(".search-box").hide();
  $('.overlay').removeClass('active');
  $('.overlay').removeClass('zindex');
  $("#back-to").show();
});

$(document).ready(function() {
    $('#search-btn').click(function () {
        var dad = $(this).parent().parent();
        dad.find('#search').show().focus();
  })
});

$(function() {
  $("#search").focus();
});
<!-- Search Box -->

$("#toggle-1").click(function(){
  $("#toggle-1").toggleClass("active");
});

$("#toggle-2").click(function(){
  $("#toggle-2").toggleClass("active");
});


<!-- Dark Theme -->
$(".dark-mode").click(function(){
$("body").toggleClass("dark-theme");
$(".dark-mode").toggleClass("active");
});


$('#sidebarCollapse').click(function() {
  if ($('.side-nav').hasClass('active')){
  } else {
    $('body').addClass('scroll-lock');
  }
});
$("#dismiss").click(function(){
$("body").removeClass("scroll-lock");
});
$(".overlay").click(function(){
$("body").removeClass("scroll-lock");
});



const initializeMaterialRipples = function(addToThisClass, rippleColor, timeExpand, timeFade) {

  const RIPPLE_ADD_TO_CLASSNAME = addToThisClass;
  const RIPPLE_COLOR = rippleColor;
  const TIME_EXPAND = timeExpand;
  const TIME_FADE = timeFade;
  const RIPPLE_CONTAINER_CLASSNAME = 'material-ripple-cont-h5c';
  const RIPPLE_CLASSNAME = 'material-ripple-h5c';

  // Add ripple containers and onClick() listeners
  var addRipples = document.getElementsByClassName(RIPPLE_ADD_TO_CLASSNAME);
  for(var i = 0; i < addRipples.length; i++) {
      var ripCont = document.createElement('div');
      ripCont.className = RIPPLE_CONTAINER_CLASSNAME;
      addRipples[i].appendChild(ripCont);
      addRipples[i].addEventListener("click", function(e){addRipple(e)}, false);
  }

  function addRipple(e){
    var targetEle;
    var ripple;
    var oldRipples;
    var relativeXPos;
    var relativeYPos;
    var rippleWidth;
    var start = null;

    // Set proper target for animation
    if (event.target.classList.contains(RIPPLE_CLASSNAME)) {
      targetEle = event.target.parentNode.parentNode;
    } else {
      targetEle = event.target;
    }

    // If old ripples exist, clear them before proceding
    oldRipples = document.getElementsByClassName(RIPPLE_CLASSNAME);
    while(oldRipples.length > 0){
        oldRipples[0].parentNode.removeChild(oldRipples[0]);
    }

    // Generate new ripple at click origin
    rippleWidth = Math.max(targetEle.getBoundingClientRect().right - targetEle.getBoundingClientRect().left, targetEle.getBoundingClientRect().bottom - targetEle.getBoundingClientRect().top) / 5;
    relativeXPos = e.pageX - targetEle.getBoundingClientRect().left - (rippleWidth/2);
    relativeYPos = e.pageY - targetEle.getBoundingClientRect().top - (rippleWidth/2);
    ripple = document.createElement('div');
    ripple.className = RIPPLE_CLASSNAME;
    ripple.style.background = RIPPLE_COLOR;
    ripple.style.borderRadius = '50%';
    ripple.style.height = rippleWidth+'px';
    ripple.style.left = relativeXPos+'px';
    ripple.style.position = 'absolute';
    ripple.style.top = relativeYPos+'px';
    ripple.style.width = rippleWidth+'px';
    targetEle.lastChild.appendChild(ripple);

    // Begin first frame of animation
    window.requestAnimationFrame(eachFrameRipple);

    function eachFrameRipple (timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      var durationFade = Math.max(TIME_FADE, TIME_EXPAND);
      console.log(durationFade);
      var t = progress/durationFade;
      var newScaleVal = Math.min(progress / TIME_EXPAND, 2)*15;
      ripple.style.opacity = 0.4 - t;
      ripple.style.transform = 'Scale('+(newScaleVal)+')';
      if (progress < durationFade) {
        // Loop to next frame
        window.requestAnimationFrame(eachFrameRipple);
      } else {
        // Final frame and end of loop
        ripple.style.opacity = 0;
        ripple.remove();
      }
    }

  }
}
initializeMaterialRipples('green-ripple', '#4CAF50', 666, 777);
initializeMaterialRipples('red-ripple', '#ff0000', 666, 777);
initializeMaterialRipples('white-ripple', '#ff7400', 666, 777);


$(window).scroll(function(){
    if ($(this).scrollTop() > 20) {
       $('.shop-navbar').addClass('fixed_top');
    } else {
       $('.shop-navbar').removeClass('fixed_top');
    }
});


$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");
});

//------------------------------------//



