function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "2500",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

function openDropdown(klasa) {
	document.addEventListener('click', closeDropdown, true);
	$('#top_links .'+klasa).addClass('open');
}

function closeDropdown() {
	document.removeEventListener('click', closeDropdown);
   $('#top_links li.open').removeClass('open');
}



/* - - - - DOCUMENT READY - - - - */
$(document).ready(function() {

	$("#product .popup").magnificPopup({
		type:'image',
		gallery: {
			enabled: true
		}
	});

	$('#cart_info .text_info').load('index.php?route=common/cart/info #prods_inner .tekst');

	$('#mob_cart_box .inner_box').load('index.php?route=common/cart/info #prods_inner', function() {
		if(!$('#mob_cart_box #prods_inner').length) {
			$('#mob_cart_box .inner_box').html('<span>Your shopping cart is empty!</span>');
			$('#mob_cart_box').addClass('empty');
		}
	});

	$(".page_header .navbar-header .navbar-toggle").click(function(e) {
		e.preventDefault();
      // $("#main_menu").toggleClass('open');
		$("#main_menu.main_menu_mob").toggleClass('open');
		$("body").toggleClass('noscroll');
	});

	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#currency input[name=\'code\']').attr('value', $(this).attr('name'));

		$('#currency').submit();
	});

	// Language
	$('#language a').on('click', function(e) {
		e.preventDefault();

		$('#language input[name=\'code\']').attr('value', $(this).attr('href'));

		$('#language').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});




	// if (localStorage.getItem('display') == 'list') {
	// 	$('#list-view').trigger('click');
	// } else {
	// 	$('#grid-view').trigger('click');
	// }

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				console.log(json);
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					// $('#content').parent().before('<div class="alert alert-success fade in"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					toastr.info(json['success']);

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart_info .text_info').html(json['total']);

						$("#cart .dropdown-menu").removeClass('empty');
						$('#mob_cart_box').removeClass('empty');
					}, 100);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart #prods').load('index.php?route=common/cart/info #prods_inner');
					$('#mob_cart_box .inner_box').load('index.php?route=common/cart/info #prods_inner');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			   alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
			// done: function() {
			// 	$("#cart .dropdown-menu").removeClass('empty');
			// 	$('#mob_cart_box').removeClass('empty');
			// }
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				// setTimeout(function () {
				// 	$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				// }, 100);
				console.log(json);

				setTimeout(function () {
					$('#cart_info .text_info').html(json['total']);
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart #prods').load('index.php?route=common/cart/info #prods_inner');
					$('#mob_cart_box .inner_box').load('index.php?route=common/cart/info #prods_inner');
					//$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
	        error: function(xhr, ajaxOptions, thrownError) {
	            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
	        }
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				// setTimeout(function () {
				// 	$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				// }, 100);
				console.log(json);

				setTimeout(function () {
					$('#cart_info .text_info').html(json['total']);

					if($("#cart #prods_inner").length == 0) {
						$("#cart #prods").html('Your shopping cart is empty!');
						$("#cart .dropdown-menu").addClass('empty');
						$('#mob_cart_box').addClass('empty');
						$('#mob_cart_box .inner_box').html('<span>Your shopping cart is empty!</span>');
					}
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart #prods').load('index.php?route=common/cart/info #prods_inner');
					$('#mob_cart_box .inner_box').load('index.php?route=common/cart/info #prods_inner');
					//$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			   alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
			// done: function() {
			//
			// 	if($("#cart #prods_inner").length == 0) {
			// 		$("#cart #prods").html('Your shopping cart is empty!');
			// 		$("#cart .dropdown-menu").addClass('empty');
			// 		$('#mob_cart_box').addClass('empty');
			// 		$('#mob_cart_box .inner_box').html('<span>Your shopping cart is empty!</span>');
			// 	}
			// }
		});
	}
}


var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					toastr.info(json['success']);
					// $('#content').parent().before('<div class="alert alert-success fade in"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
	        error: function(xhr, ajaxOptions, thrownError) {
	            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
	        }
		});
	},
	'remove': function() {

	}
}


/* Agree to Terms
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});
*/
