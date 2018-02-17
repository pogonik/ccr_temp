require('es6-promise').polyfill();

// export const baseUrl = document.querySelector("meta[name=base]").getAttribute("content");
// export const basePath = document.querySelector("meta[name=base_path]").getAttribute("content");

// export const baseUrl = 'http://dev.motorradpneuhaus.ch/';
export const baseUrl = 'http://localhost/ccr/';
export const basePath = '/';

export const baseApiUrl = baseUrl+'index.php?route=api/';
// export const baseApiUrl = baseUrl+'api/';

export const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export const returnJSON = (response) => {
	return response.json();
}

export function fixURLQuery(newQuery) {
	let query = {};
	query['atts'] = {};

	// _.map(newQuery, (val,key) => {
	//    if(val !== null || val !== '') {
	//       if(key.indexOf('atts[') != -1) {
	//          let kljuc = key.replace('atts[','').replace(']','');
	//          query['atts'][kljuc] = val;
	//       } else {
	//          query[key] = val;
	//       }
	//    }
	// });
	newQuery.map((val,key) => {
		if(val !== null || val !== '') {
			if(key.indexOf('atts[') != -1) {
				let kljuc = key.replace('atts[','').replace(']','');
				query['atts'][kljuc] = val;
			} else {
				query[key] = val;
			}
		}
	});
	return query;
}

export function getURLQuery(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

export function URLParamsToObject(variable) {
	let query = window.location.search.substring(1);
	let vars = query.split("&");
	let niz = {};
	// _.map(vars, (val, key) => {
	//    let newVal = val.split("=");
	//    niz[newVal[0]] = newVal[1];
	// });

	vars.map((val, key) => {
		let newVal = val.split("=");
		niz[newVal[0]] = newVal[1];
	});

	return niz;
}

export function getPathname() {
	let query = window.location.pathname.split("/");
	let duzina = query.length;
	if(duzina > 0) { duzina = duzina - 1; }

	return query[duzina];
}

export function validateEmail(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regex.test(email);
}


export function serialize(form) {
	var field,
		l,
		s = [];
	if (typeof form == 'object' && form.nodeName == "FORM") {
		var len = form.elements.length;
		for (var i = 0; i < len; i++) {
			field = form.elements[i];
			if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
				if (field.type == 'select-multiple') {
					l = form.elements[i].options.length;
					for (var j = 0; j < l; j++) {
						if (field.options[j].selected)
							s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					} else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
					s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
				}
			}
		}
	}
	return s.join('&').replace(/%20/g, '+');
}


export function serialize2(obj) {
	var str = "";
	for (var key in obj) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + encodeURIComponent(obj[key]);
	}
	return str;
}


