import React from 'react';

import SvgIcon from '../components/SvgIcon';

const BestIcon = props => {
	let style = Object.assign({
		verticalAlign: 'middle'
	}, props.style);

	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<path fillRule="evenodd" clipRule="evenodd" d="M11.6,37.9L0,49.5h8.4L8.3,58l12-11.9C16.8,44,13.7,41.3,11.6,37.9z"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M32,6c-10.9,0-19.8,8.9-19.8,19.8S21.1,45.5,32,45.5s19.8-8.9,19.8-19.8
					S43,6,32,6z M40,35H25v-4h6V21h-4v-4h8v14h5V35z"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M64,49.5L52.6,38c-2.1,3.4-5.1,6.3-8.6,8.4L55.7,58l0-8.5L64,49.5z"/>
			</g>
		</svg>
	);
}

const TagIcon = props => {
	let style = Object.assign({
		verticalAlign: 'middle'
	}, props.style);

	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<path d="M47.9,17.1L61.2,32L47.9,46.9H2V17.1H47.9 M48.7,15H0v34h48.8L64,32L48.7,15L48.7,15z"/>
				<path d="M44.7,27.6c2.2,0,4.3,2.1,4.3,4.5c0,2.3-2.1,4.2-4.3,4.2c-2.2,0-4-1.9-4-4.2C40.7,29.8,42.5,27.6,44.7,27.6 M44.7,25.5
					c-3.3,0-6,3-6,6.6c0,3.5,2.7,6.4,6,6.4c3.4,0,6.4-2.9,6.4-6.4C51,28.6,48.1,25.5,44.7,25.5L44.7,25.5z"/>
			</g>
		</svg>
	);
}

const MenuIcon = props => {
	let style = Object.assign({
		width:'64px',
		height:'64px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<path d="M7,17h50v6H7V17z"/>
				<path d="M7,29h50v6H7V29z"/>
				<path d="M7,41h50v6H7V41z"/>
			</g>
		</svg>
	);
}

const Heart2Icon = props => {
	let style = Object.assign({
		width:props.size+'px',
		height:props.size+'px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M43.7,7.9c9.6,0,17.4,6.1,17.4,18.2c0,12.9-22,25.3-25.9,27.7L32,55.7l-3.2-1.9C23.4,50.5,2.9,38.6,2.9,26.1
				c0-12.9,7.7-18.2,17.4-18.2c6.4,0,11.6,5.6,11.6,8.9C32,13.6,37.4,7.9,43.7,7.9 M43.7,6c-4.6,0-9.2,2.8-11.7,6
				c-2.4-3.2-6.7-6-11.6-6C8.2,6,1,13.5,1,26.1c0,13,18.9,24.5,26.1,28.9l0.8,0.5l3.2,1.9l1,0.6l1-0.6l3.2-1.9c0.2-0.1,0.5-0.3,0.8-0.5
				c17.3-10.3,26-20,26-28.9C63,13.9,55.4,6,43.7,6L43.7,6z"/>
		</svg>
	);
}

const FAQIcon = props => {
	let style = Object.assign({
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<path d="M31.9,0C21.8,0,13.5,8,13.5,18h7.4c0-6,4.9-10.7,11-10.7c6.1,0,11,4.3,11,10.4c0,5.7-4.3,10.3-9.8,10.3H29v20h7V36.6
					c8-1.7,14.5-9.3,14.5-18.1C50.5,8.4,42.1,0,31.9,0z"/>
				<circle cx="31.9" cy="58.5" r="5.5"/>
			</g>
		</svg>
	);
}

const ContactIcon = props => {
	let style = Object.assign({
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<path d="M59,44.7c1.9-4,3-8.5,3-13.3c0-17.1-13.9-31-31-31c-17.1,0-31,13.9-31,31c0,17.1,13.9,31,31,31c5.4,0,10.4-1.4,14.8-3.8
					L64,63.6L59,44.7z M55.7,55.2L45,52.4L43,53.5c-3.6,2-7.8,3-12,3c-13.8,0-25.1-11.3-25.1-25.1C5.9,17.6,17.2,6.3,31,6.3
					c13.8,0,25.1,11.3,25.1,25.1c0,3.7-0.8,7.3-2.5,10.8l-0.9,2L55.7,55.2z"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M18.7,21.7h23.6v5.9H18.7V21.7z"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M18.7,33.5h23.6v5.9H18.7V33.5z"/>
			</g>
		</svg>
	);
}

const ReturnIcon = props => {
	let style = Object.assign({
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<g>
				<polygon points="18.3,12.3 14,8 0,22 0,22 0,22 13.9,35.9 18.3,31.6 8.7,22 	"/>
				<path d="M45.6,19H19v6h26.6c6.8,0,12.3,5.7,12.3,12.5S52.4,50,45.6,50H4v6h41.6C55.8,56,64,47.6,64,37.5S55.8,19,45.6,19z"/>
			</g>
		</svg>
	);
}

const MenuArrowIcon = props => {
	let style = Object.assign({
		width:'48px',
		height:'48px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet" style={style}>
			<polygon points="28.8,37.4 28.1,36.6 41.3,23.4 28.7,10.9 29.4,10.1 42.7,23.4"/>
			<rect x="5" y="23" width="29" height="1"/>
		</svg>
	);
}

const LupaIcon = props => {
	let style = Object.assign({
		width:'30px',
		height:'30px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M37.5,4C25.1,4,15,14.1,15,26.5c0,5.1,1.7,9.7,4.5,13.5L5,54.4l0,0c-0.6,0.6-1,1.4-1,2.3C4,58.6,5.4,60,7.2,60
				c0.9,0,1.7-0.4,2.3-1l0,0L24,44.5c3.8,2.8,8.4,4.5,13.5,4.5C49.9,49,60,38.9,60,26.5C60,14.1,49.9,4,37.5,4z M37.5,42.6
				c-8.9,0-16.1-7.2-16.1-16.1c0-8.9,7.2-16.1,16.1-16.1c8.9,0,16.1,7.2,16.1,16.1C53.6,35.4,46.4,42.6,37.5,42.6z"/>
		</svg>
	);
}

const CheckBoxIcon = props => {
	let style = Object.assign({
		width:'20px',
		height:'20px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M17.6,20H2.4C1.1,20,0,18.9,0,17.6V2.4C0,1.1,1.1,0,2.4,0h15.2C18.9,0,20,1.1,20,2.4v15.2
				C20,18.9,18.9,20,17.6,20z M2.4,1C1.6,1,1,1.6,1,2.4v15.2C1,18.4,1.6,19,2.4,19h15.2c0.8,0,1.4-0.6,1.4-1.4V2.4
				C19,1.6,18.4,1,17.6,1H2.4z"/>
			<path className="circle" d="M13,10c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S13,8.3,13,10z"/>
		</svg>
	);
}

const StarIcon = props => {
	let style = Object.assign({
		width:props.size+'px',
		height:props.size+'px',
		verticalAlign: 'middle'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M32,1.6l7.6,23.2H64L44.2,39.2l7.6,23.2L32,48.1L12.2,62.4l7.6-23.2L0,24.8h24.4L32,1.6z"/>
		</svg>
	);
}

const Caret = props => {
	let style = Object.assign({
		width:'15px',
		height:'8px',
		verticalAlign: 'top'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 15 8" preserveAspectRatio="xMidYMid meet" style={style}>
			<polygon points="7.5,8.6 0.1,1.1 0.9,0.3 7.5,6.9 14.1,0.3 14.9,1.1 	"/>
		</svg>
	);
}

const Caret2 = props => {
	let style = Object.assign({
		verticalAlign: 'top'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 15 8" preserveAspectRatio="xMidYMid meet" style={style}>
			<polygon points="7.5,8.6 0.1,1.1 0.9,0.3 7.5,6.9 14.1,0.3 14.9,1.1 	"/>
		</svg>
	);
}

const FilterTabBtn1 = props => {
	let style = Object.assign({
		width:'117px',
		height:'30px',
		color: '#999',
		fontFamily: 'Geogrotesque, sans-serif',
		fontWeight: 'normal',
		fontSize: '15px'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 117 30" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M114.6,1L87.5,29H3c-1.1,0-2-0.9-2-2V3c0-1.1,0.9-2,2-2H114.6 M117,0H3C1.3,0,0,1.3,0,3v24
					c0,1.7,1.3,3,3,3h85L117,0L117,0z"/>
			<text transform="matrix(1 0 0 1 8.4017 19.6277)">BY SIZE</text>
		</svg>
	);
}

const FilterTabBtn2 = props => {
	let style = Object.assign({
		width:'117px',
		height:'30px',
		color: '#999',
		fontFamily: 'Geogrotesque, sans-serif',
		fontWeight: 'normal',
		fontSize: '15px'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 117 30" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M114,1c1.1,0,2,0.9,2,2v24c0,1.1-0.9,2-2,2H2.4L29.5,1H114 M114,0H29L0,30h114c1.7,0,3-1.3,3-3V3
				C117,1.3,115.7,0,114,0L114,0z"/>
			<text transform="matrix(1 0 0 1 29.5119 19.6277)">BY VEHICLE</text>
		</svg>
	);
}

const MenuFilterTab1 = props => {
	let style = Object.assign({
		width:'400px',
		height:'40px',
		color: '#999',
		fontFamily: 'Geogrotesque, sans-serif',
		fontWeight: 'normal',
		fontSize: '16px'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 400 40" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M396.8,1.3l-36.1,37.3H4c-1.5,0-2.7-1.2-2.7-2.7V4c0-1.5,1.2-2.7,2.7-2.7H396.8 M400,0H4C1.7,0,0,1.7,0,4
				v32c0,2.3,1.7,4,4,4h357.3L400,0L400,0z"/>
			<text transform="matrix(1 0 0 1 12 24.9358)">BY SIZE</text>
		</svg>
	);
}

const MenuFilterTab2 = props => {
	let style = Object.assign({
		width:'400px',
		height:'40px',
		color: '#999',
		fontFamily: 'Geogrotesque, sans-serif',
		fontWeight: 'normal',
		fontSize: '16px'
	}, props.style);
	return (
		<svg {...props} viewBox="0 0 400 40" preserveAspectRatio="xMidYMid meet" style={style}>
			<path d="M3.2,38.7L39.3,1.3H396c1.5,0,2.7,1.2,2.7,2.7v32c0,1.5-1.2,2.7-2.7,2.7H3.2 M0,40h396c2.3,0,4-1.7,4-4V4
				c0-2.3-1.7-4-4-4L38.7,0L0,40L0,40z"/>
			<text transform="matrix(1 0 0 1 300.5616 24.9358)">BY VEHICLE</text>
		</svg>
	);
}

const LupaIcon1 = props => {
	return (
		<SvgIcon {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet">
			<path d="M37.5,4C25.1,4,15,14.1,15,26.5c0,5.1,1.7,9.7,4.5,13.5L5,54.4l0,0c-0.6,0.6-1,1.4-1,2.3C4,58.6,5.4,60,7.2,60
				c0.9,0,1.7-0.4,2.3-1l0,0L24,44.5c3.8,2.8,8.4,4.5,13.5,4.5C49.9,49,60,38.9,60,26.5C60,14.1,49.9,4,37.5,4z M37.5,42.6
				c-8.9,0-16.1-7.2-16.1-16.1c0-8.9,7.2-16.1,16.1-16.1c8.9,0,16.1,7.2,16.1,16.1C53.6,35.4,46.4,42.6,37.5,42.6z"/>
		</SvgIcon>
	);
}

const ZoomPlusIcon = props => {
	return (
		<SvgIcon {...props} viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet">
			<path d="M59.2,55.1L42.9,38.9c-0.1-0.1-0.2-0.2-0.3-0.2c2.8-3.6,4.5-8.2,4.5-13.1C47.1,13.6,37.4,4,25.5,4C13.6,4,4,13.6,4,25.5
				c0,11.9,9.6,21.5,21.5,21.5c4.9,0,9.4-1.7,13.1-4.5c0.1,0.1,0.1,0.2,0.2,0.3l16.2,16.2c1.1,1.1,2.9,1.1,4.1,0
				C60.3,58,60.3,56.2,59.2,55.1z M6.9,25.5c0-10.3,8.4-18.7,18.7-18.7s18.7,8.4,18.7,18.7s-8.4,18.7-18.7,18.7S6.9,35.8,6.9,25.5z"/>
			<path d="M37,27H27v10h-3V27H14v-3h10V14h3v10h10V27z"/>
		</SvgIcon>
	);
}

const UserIcon = props => {
	return (
		<SvgIcon {...props} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
			<path d="M50.5,5c-14,0-25,11-25,25s11,25,25,25s25-11,25-25S64.5,5,50.5,5z M50.5,45c-9,0-15.5-7-15.5-15
				c0-8.5,7-15,15.5-15C57,15,65,21,65,30S58,45,50.5,45z"/>
			<path d="M50,65C28.5,65,9,77,0,95h10c11-14.5,23.5-21,40-21c17,0,29,6.5,40,21h10C91,77,71.5,65,50,65z"/>
		</SvgIcon>
	);
}

const BagIcon = props => {
	return (
		<SvgIcon {...props} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
			<path d="M70,29.9c-0.1-11-9-19.8-20-19.8c-11,0-19.9,8.9-20,19.8H0v10
				l19.9,50h60l0,0l20.1-50h0v-10H70z M50,20.1c5.5,0,9.9,4.4,10,9.8H40C40.1,24.5,44.5,20.1,50,20.1z M73.1,79.9H26.7l-15.9-40h78.5
				L73.1,79.9z"/>
		</SvgIcon>
	);
}

const HeartIcon = props => {
	return (
		<SvgIcon {...props} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
			<path d="M68,4.6c-7.5,0-15.1,5.5-18.1,11.6C47.2,10,39.4,4.6,32.2,4.6
				C13.8,4.6,0,19.5,0,39.1c0,23.7,33.8,46.2,44.1,52.6l6,3.7l6-3.7c7.3-4.5,43.9-28,43.9-52.6C100,19.5,86.3,4.6,68,4.6z M50.1,81.9
				c0,0-38.6-23.7-38.6-42.7c0-11.5,7.1-23,20.7-23c12.4,0,17.9,17.5,17.9,17.5S54.9,16.1,68,16.1c13.1,0,20.5,11.3,20.5,23
				C88.5,58.4,50.1,81.9,50.1,81.9z"/>
		</SvgIcon>
	);
}

const Tire = props => {
	return (
		<SvgIcon viewBox="0 0 210 60" x="0" y="0" id="tire" style={props.style}>
			<path id="guma" fill="#666" d="M58.5,58.7H62a77.22,77.22,0,0,1,43-12.9,78,78,0,0,1,43,12.9h3.5A80,80,0,0,0,58.5,58.7ZM105,8.8A114.83,114.83,0,0,0,10.2,58.7h1.2a114,114,0,0,1,187.2,0h1.2A114.83,114.83,0,0,0,105,8.8ZM3.6,58.7c0.6-1,1.3-2,2-3l0.4,3H6.8l4.6-6.3-0.6-3.9c1-1.3,2.1-2.6,3.2-3.8l0.1,3h0v1l0.7-.7h0l5.5-5.8L20.2,38c1.2-1.2,2.5-2.4,3.7-3.5l-0.3,4.1,0.5-.4h0l6.3-5.4,0.3-4c1.3-1,2.6-2,4-3l-0.8,4,0.6-.4h0l7-4.5,0.8-4.1c1.4-.9,2.8-1.7,4.3-2.5l-1.3,3.8,0.6-.3h0l7.5-3.7,1.3-3.9c1.5-.7,3.1-1.4,4.6-2l-1.6,3.6,0.6-.2,7.8-2.9,1.6-3.5c1.7-.6,3.4-1.1,5.2-1.6l-1.7,2.7-0.5.8,0.7-.2L79.5,9l2.2-3.5c1.6-.3,3.2-0.6,4.9-0.9L84.2,7.7l1-.1,7.9-1,2.4-3,5.6-.3L98.6,6h9l2.6-2.6c1.8,0.1,3.7.2,5.5,0.4l-3.2,2.6,0.7,0.1h0.3l7,0.7h0l1,0.1,2.9-2.4c1.8,0.3,3.6.6,5.3,1L127,7.5l-0.8.5,0.7,0.2,0.3,0.1h0L134,9.8h0l1,0.2,3.2-2.1c1.8,0.5,3.5,1,5.2,1.6l-3.8,1.8,0.6,0.2,6.9,2.5,0.9,0.3,3.6-1.7c1.6,0.7,3.1,1.3,4.6,2.1L152.3,16l0.6,0.3h0l6.5,3.3,0.9,0.5,3.8-1.2c1.5,0.8,2.9,1.7,4.4,2.6l-4,.8,0.6,0.4,0.2,0.1h0.1l5.8,4,0.8,0.6,4.1-.8c1.1,0.8,2.2,1.7,3.3,2.5l-4.1.5,0.8,0.6,5.5,4.4h0l0.8,0.6,3.7-.4c1.2,1.1,2.3,2.2,3.5,3.3l-4.1-.1,0.5,0.5,0.2,0.2h0l4.9,5,0.7,0.7,3.9,0.1,3.3,3.9-3.8-.5,0.6,0.8,4.3,5.5h0l0.6,0.8,3.5,0.4c0.7,1.1,1.4,2.1,2.1,3.2h2.4a122.52,122.52,0,0,0-207.5.1H3.6Zm200.1-4-2.6-.3-4.3-5.5,2.8,0.4C201.1,51,202.4,52.9,203.7,54.7Zm-8.6-10.9-3-.1-4.9-5,3.1,0.1C192,40.4,193.6,42.1,195.1,43.8Zm-9.7-9.7-2.8.3L177.1,30l3.1-.4C182,31.1,183.8,32.6,185.4,34.1Zm-10-8.1-3.2.6-5.8-4,3.1-.6C171.5,23.3,173.5,24.6,175.4,26Zm-12-7.6-2.9,1-6.2-3.2,3-1C159.4,16.2,161.4,17.3,163.4,18.4Zm-12.5-6.1-2.8,1.3-6.6-2.4,2.9-1.4C146.6,10.6,148.7,11.5,150.9,12.3ZM137.3,7.7l-2.5,1.6L128,7.7,130.6,6C132.9,6.5,135.1,7.1,137.3,7.7Zm-13.9-3-2.2,1.8-7-.7,2.4-2C118.9,4.1,121.2,4.3,123.4,4.7ZM105,3.3c1.4,0,2.8,0,4.2.1l-1.9,1.9h-7l2-2H105Zm-10.3.4L92.9,6,86,6.9l1.8-2.4C90,4.2,92.3,3.9,94.7,3.7Zm-13.8,2L79.2,8.4,72.4,10l1.7-2.7C76.3,6.7,78.6,6.2,80.9,5.7ZM67,9.4l-1.2,2.7-6.6,2.4,1.3-2.7C62.6,11,64.8,10.2,67,9.4ZM54,14.6l-1,3-6.3,3.1,1-2.9C49.7,16.7,51.8,15.6,54,14.6ZM35.7,25.2c1.9-1.3,3.9-2.6,5.9-3.9L41,24.4l-5.9,3.8ZM24.8,33.8c1.7-1.5,3.5-3.1,5.3-4.5l-0.3,3.1L24.6,37Zm-5.2,4.9,0.1,3.2-4.9,5-0.1-3.1C16.4,42.1,18,40.4,19.6,38.7ZM10.3,49.3l0.4,3L6.6,57.9l-0.5-3C7.5,53,8.9,51.1,10.3,49.3ZM90.67,37.22a0.63,0.63,0,0,1-.61.7l-2.3.29a0.44,0.44,0,0,1-.54-0.55l1.86-16.5a0.65,0.65,0,0,1,.61-0.7l2.3-.29a0.43,0.43,0,0,1,.54.55Z" transform="translate(-1.2 -1.3)"/>

			<path id="zollNum" fill={props.colors[2]} d="M130.5,32l0.76,5.37c0.05,0.39-.26.57-0.7,0.46l-2.15-.52a0.7,0.7,0,0,1-.43-0.74l-0.68-4.83-1.49-.36-1.07,4.4a0.5,0.5,0,0,1-.7.46l-2.15-.52a0.52,0.52,0,0,1-.43-0.74l3-12.35a0.51,0.51,0,0,1,.72-0.46l4.3,1c3.74,0.91,4.65,2.92,4.23,4.63l-0.42,1.73A3.17,3.17,0,0,1,130.5,32Zm-3.28-6.47-0.77,3.17L128,29.1c1,0.24,1.9.06,2.13-.85l0.14-.58c0.22-.92-0.52-1.5-1.5-1.73Zm16.23,1.92c0.26,0.06.54,0.2,0.34,0.74L140,38.28l2.28,0.86a0.5,0.5,0,0,1,.37.75l-0.56,1.5a0.52,0.52,0,0,1-.79.34l-7.83-2.94a0.51,0.51,0,0,1-.37-0.77l0.56-1.5a0.5,0.5,0,0,1,.78-0.32l2.38,0.89,2.84-7.58L137.18,29a0.46,0.46,0,0,1-.4-0.7l0.56-1.5a0.6,0.6,0,0,1,.81-0.4Zm14.64,7.06a0.5,0.5,0,0,1,.28.79l-0.71,1.38a1.21,1.21,0,0,1-.3.35l-9.24,7.32a0.84,0.84,0,0,1-1,.2L145,43.43c-0.38-.2-0.46-0.45-0.08-0.73L154,35.51l-5.28-2.72a0.51,0.51,0,0,1-.27-0.81l0.73-1.42a0.5,0.5,0,0,1,.81-0.23Z" transform="translate(-1.2 -1.3)"/>

			<path id="hoeheNum" fill={props.colors[1]} d="M103.34,20a0.5,0.5,0,0,1,.63.55l0.05,1.6a0.51,0.51,0,0,1-.6.61l-5,.16,0.06,2,1,0c3.85-.12,5.12,1.56,5.17,3.32l0.08,2.36c0.06,1.76-1.08,3.54-4.93,3.67s-5.1-1.58-5.15-3.34l0-.74a0.5,0.5,0,0,1,.55-0.63l2.11-.07a0.51,0.51,0,0,1,.61.6v0.25c0,0.94.76,1.31,1.76,1.28s1.69-.44,1.66-1.39l0-1.37c0-.94-0.74-1.29-1.74-1.26l-3.79.12a0.5,0.5,0,0,1-.59-0.6L95,20.88a0.5,0.5,0,0,1,.55-0.63Zm12.88,0.77a0.5,0.5,0,0,1,.57.62L116.65,23a0.51,0.51,0,0,1-.66.54l-5-.41-0.17,2,1,0.08c3.84,0.32,4.91,2.13,4.76,3.89l-0.19,2.35c-0.14,1.76-1.47,3.4-5.31,3.08s-4.88-2.15-4.74-3.91l0.06-.74a0.5,0.5,0,0,1,.62-0.57l2.1,0.17a0.51,0.51,0,0,1,.54.66l0,0.25c-0.08.94,0.61,1.39,1.61,1.47s1.73-.25,1.81-1.19l0.11-1.37c0.08-.94-0.59-1.36-1.59-1.45l-3.78-.31a0.5,0.5,0,0,1-.52-0.66l0.51-6.19a0.5,0.5,0,0,1,.62-0.57Z" transform="translate(-1.2 -1.3)"/>

			<path id="breiteNum" fill={props.colors[0]} d="M55.19,30.63c0.22-.15.52-0.25,0.77,0.26l4.73,9.67,2.19-1.07a0.5,0.5,0,0,1,.81.25l0.7,1.44a0.52,0.52,0,0,1-.29.8l-7.51,3.68a0.51,0.51,0,0,1-.81-0.26L55.07,44a0.5,0.5,0,0,1,.3-0.79l2.28-1.12-3.56-7.28L52,36.23A0.46,0.46,0,0,1,51.19,36l-0.7-1.44a0.6,0.6,0,0,1,.26-0.86Zm7.53,0.44c-0.59-1.66-.29-3.61,3.19-4.84s4.95,0.11,5.53,1.77l0.45,1.28a2.25,2.25,0,0,1-.62,2.44,2.32,2.32,0,0,1,2.25,1.45l0.56,1.6c0.58,1.66,0,3.7-3.44,4.93s-5.16,0-5.75-1.69l-0.56-1.61a2.3,2.3,0,0,1,.83-2.53,2.26,2.26,0,0,1-2-1.52Zm5.79-1.52a1.17,1.17,0,0,0-1.72-.81,1.15,1.15,0,0,0-.81,1.7l0.11,0.31a1.15,1.15,0,0,0,1.7.81,1.17,1.17,0,0,0,.83-1.71Zm2.05,5.21c-0.31-.89-1-1-1.9-0.7s-1.33.84-1,1.73l0.22,0.64a1.28,1.28,0,0,0,1.89.75,1.29,1.29,0,0,0,1-1.77Zm4.06-7.69c-0.39-1.72.13-3.62,3.73-4.44s4.9,0.68,5.29,2.4l0.3,1.32A2.25,2.25,0,0,1,83,28.7a2.32,2.32,0,0,1,2.07,1.7l0.38,1.66c0.39,1.72-.39,3.68-4,4.5s-5.12-.63-5.51-2.35L75.6,32.55a2.3,2.3,0,0,1,1.12-2.42,2.26,2.26,0,0,1-1.8-1.74Zm5.93-.83a1.17,1.17,0,0,0-1.61-1,1.15,1.15,0,0,0-1,1.59L78,27.15a1.15,1.15,0,0,0,1.59,1,1.17,1.17,0,0,0,1-1.6ZM82,31.65c-0.21-.92-0.86-1.13-1.81-0.92s-1.42.68-1.22,1.6L79.11,33a1.28,1.28,0,0,0,1.79,1,1.29,1.29,0,0,0,1.23-1.64Z" transform="translate(-1.2 -1.3)"/>

		</SvgIcon>
	);
}

Tire.defaultProps = {
	colors: ['#666', '#666', '#666'],
	color1: '#666',
	color2: '#666',
	color3: '#666',
	style: {
		width: '210px',
		height: '60px'
	}
}

export { 
	BestIcon, TagIcon, MenuIcon, Heart2Icon, 
	FAQIcon, ContactIcon, ReturnIcon, MenuArrowIcon, 
	LupaIcon, CheckBoxIcon, StarIcon, Caret, Caret2, 
	FilterTabBtn1, FilterTabBtn2, MenuFilterTab1, MenuFilterTab2, 
	LupaIcon1, ZoomPlusIcon, Tire, BagIcon, UserIcon, HeartIcon 
};