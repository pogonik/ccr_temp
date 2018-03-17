let lang = getCookie('language');
export const language = (lang && (lang === 'de' || lang === 'de-DE')) ? 'de' : lang;

export function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return;
}

const sortOptsLangs = {
	de: [{ value: 'pd.name|ASC', label: 'Name (A - Z)' },
   { value: 'pd.name|DESC', label: 'Name (Z - A)' },
   { value: 'p.price|ASC', label: 'Preis (niedrig > hoch)' },
   { value: 'p.price|DESC', label: 'Preis (hoch > niedrig)' },
   { value: 'm.name|ASC', label: 'Marke (A - Z)' },
   { value: 'm.name|DESC', label: 'Marke (Z - A)' }],
   en: [{ value: 'pd.name|ASC', label: 'Name (A - Z)' },
   { value: 'pd.name|DESC', label: 'Name (Z - A)' },
   { value: 'p.price|ASC', label: 'Price (low > high)' },
   { value: 'p.price|DESC', label: 'Price (high > low)' },
   { value: 'm.name|ASC', label: 'Brand (A - Z)' },
   { value: 'm.name|DESC', label: 'Brand (Z - A)' }]
};

export const sortOptions = sortOptsLangs[language];

export const perPageOptions = [
   { value: 12, label: '12' },
   { value: 24, label: '24' },
   { value: 48, label: '48' },
   { value: 96, label: '96' }
];