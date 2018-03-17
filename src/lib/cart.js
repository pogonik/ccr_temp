import fetch from 'whatwg-fetch';
import { fixURLQuery, basePath, baseUrl, baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

function addToCart(product_id, quantity = 1) {

	fetch('index.php?route=checkout/cart/add', {
		type: 'POST',
		body: JSON.stringify({
			product_id: product_id,
			quantity: quantity
		}),
		headers: {'Content-Type': 'application/json'},
		credentials: 'same-origin'
		})
		.then(checkStatus).then(returnJSON)
		.then(data => {

			//toastr.info(json['success']);

			// Need to set timeout otherwise it wont update the total
			setTimeout(function () {
				document.querySelector('#cart_info .text_info').innerHTML(data['total']);

				document.querySelector("#cart .dropdown-menu").classList.remove('empty');
				document.querySelector('#mob_cart_box').classList.remove('empty');
			}, 100);

			//scrollToTop();

			// $('#cart #prods').load('index.php?route=common/cart/info #prods_inner');
			// $('#mob_cart_box .inner_box').load('index.php?route=common/cart/info #prods_inner');

		});

}

