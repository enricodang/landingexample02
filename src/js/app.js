'use strict';
var app = {

  initReady: function() {
    this.startEvents();
  },

  initLoad: function() {
    this.dataBox();
    this.checkServiceWorker();
  },

  initFirstLoad: function(){
    
  },

  rebuildAllEvents: function(){
    
  },

  initResize: function(){
    
  },

  initResizeEnd: function(){
    
  },

  initScroll: function(){
  },

  startEvents:function() {
    $('#privacy').prop('checked',true);
    $('[name="searchBox"]').on('keyup',function(){
    	if($(this).val().length > 3) {
    		app.dataBox($(this).val(),$(this));
    	}
    });
  },

	dataBox:function(term) {
		var xmlhttp = new XMLHttpRequest();
		var limit = 1000;
		var term_filter = (!term ? '' : term);
		console.log(term_filter);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data_parsed = JSON.parse(this.responseText);
				var data_sliced = data_parsed.slice(0, 3000);
				app.filterDataBox(data_sliced,term_filter);
			}
		};
		xmlhttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', true);
		xmlhttp.send();
	},


	filterDataBox:function(arrObjects,filter) {

		var filterString = filter;
		var filteredArray = arrObjects.filter(
			function(el) {
				return el.title.indexOf(filter) > -1;
			}
		);
		var output = '';
		console.log(filteredArray);

		$.each(filteredArray,function(index,data){
			if(index < 13) {
				output += '<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">';
				output += '<div class="theBoxes__searchResult--item" style="background-image:url('+data.thumbnailUrl+')">';
				output += data.title
				output += '</div>';
				output += '</div>';
			} else {
				return false;
			}
		});
		$('.theBoxes__searchResult').html(output);
	},

	checkServiceWorker:function() {
		if (!('serviceWorker' in navigator)) {
			console.log('serviceWorker not supported');
			$('.visual__box.webpush').hide();
			$('.visual__box.qrcode').show();

		}
		if (!('PushManager' in window)) {
			console.log('PushManager not supported'); 
			$('.visual__box.webpush').css('display','none');
			$('.visual__box.qrcode').css('display','flex');		
		}
	},

	formValidation:function() {
		window.addEventListener('load', function() {
	    var forms = document.getElementsByClassName('needs-validation');
	    var validation = Array.prototype.filter.call(forms, function(form) {
	      form.addEventListener('submit', function(event) {
	        if (form.checkValidity() === false) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	        form.classList.add('was-validated');
	      }, false);
	    });
	  }, false);
	}
}


app.initReady();

$( window ).on('load',function() {
app.initLoad();
app.initFirstLoad();
});

$(window).resize(function(){
  app.initResize();
});


if(typeof $(window).resizeend === 'function'){
  $(window).resizeend(function () {
app.initResizeEnd();
  });
} else {
  $(window).resize(function(){
app.initResizeEnd();
  });
}

$(window).scroll(function(){
  app.initScroll();
});
