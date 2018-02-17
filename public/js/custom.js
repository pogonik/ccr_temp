$(document).ready(function() {

	$('.date').datetimepicker({
		minDate: moment().add(7, 'days'),
		format: 'DD/MM/YYYY',
		useCurrent: false,
		widgetPositioning: {
			'horizontal': 'left'
		},
		allowInputToggle: true,
		daysOfWeekDisabled: [6],
		locale: 'de',
		icons: {
            time: 'fa fa-time',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
			}
	});

	$('.time').datetimepicker({
		disabledTimeIntervals: [
	      [moment().hour(0).minutes(0), moment().hour(8).minutes(30)],
	      [moment().hour(12).minutes(0), moment().hour(24).minutes(0)]
		//	[moment().hour(18).minutes(0), moment().hour(24).minutes(0)]
		],
		format: 'HH:mm',
		stepping: 30,
		useCurrent: false,
		allowInputToggle: true,
		icons: {
            time: 'fa fa-time',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
			}
	});

	var date = [];
	var time = [];

	$("#schedule_form .date, #schedule_form .time").on("dp.change", function(e) {
		var num = $(this).data('termin');

		if(e.date) {
			if($(this).hasClass('date')) {
				date[num] = moment(e.date).format('DD.MM.YYYY');
			} else {
				time[num] = moment(e.date).format('HH:mm');
			}
		} else {
			if($(this).hasClass('date')) {
				date.splice(num, 1);
			} else {
				time.splice(num, 1);
			}
		}
		enableSubmit();
	});

	$("#schedule_form input[name='accept']").on("change", function(e) {
		enableSubmit();
	});

	$("#schedule_form #next_step").on("click", function(e) {
		$("#schedule_form .step_2").addClass('active');
	});


	function enableSubmit() {
		if(document.getElementById('accept').checked && date.length > 0 && time.length > 0) {
			$("#schedule_form .step_1 .btn-submit").removeAttr('disabled');
		} else {
			$("#schedule_form .step_1 .btn-submit").attr('disabled', 'disabled');
		}
	}

	$("#schedule_form #submit").on("click", function(e) {
		e.preventDefault();

		console.log(e.currentTarget.form);

		if(e.currentTarget.form[10].validity.valid && e.currentTarget.form[11].validity.valid && e.currentTarget.form[12].validity.valid) {
			submitReifenmontage();
		} else {
			var info = e.currentTarget.form[10].validationMessage+'<br/>'+e.currentTarget.form[11].validationMessage+'<br/>'+e.currentTarget.form[12].validationMessage;
			toastr.info(info, '', {timeOut: 8000});
		}
	});

	function submitReifenmontage() {
		$.ajax({
			method: "POST",
			url: $("#schedule_form").attr('action'),
			data: $("#schedule_form").serialize(),
		}).fail(function(msg) {
			toastr.info(msg);
		}).done(function(json) {
			var info = '<p>Velen Dank</p><p>Ihre Anfrage wurde gespeichert und Sie bekommen in Kurze Bestatigungsmail</p><p>Ihr CC Racing Team</p>';
			//toastr.options.timeOut = 8000;
			toastr.info(info, '', {timeOut: 8000});
		});
	}

   // Preloader
	//-------------------------------------------

	if( $("#preloader").length ) {

		$(window).on('load', function() {
			$("#preloader").fadeOut(200);
			$("#preloader-wrapper").delay(200).fadeOut(200);
		});
	}

	// Hero Scroll
	//-------------------------------------------

	var windowHeight;

	$(window).on("resize", function() {

		windowHeight = $(window).height();

		let sirina = $(window).width();
		let visina = $(window).height();
		let razlika = sirina/visina;
		let odnos = razlika.toFixed(1);

		if(odnos >= 0.9) {
			$("#slider .hidden").removeClass('hidden');
			$("#slider .carousel-sm").addClass('hidden');
		} else {
			$("#slider .hidden").removeClass('hidden');
			$("#slider .carousel-lg").addClass('hidden');
		}

		if(sirina < 1200) {
			if(! $("#side_filter h3 a").hasClass('collapsed')) {
				$("#side_filter h3 a").addClass('collapsed');
				$("#side_links h3 a").addClass('collapsed');
			}

			$(".side_filter_group form").removeClass('in');
			$("#side_links_nav").removeClass('in');
			$(".side_links_group nav").removeClass('in');

		} else {
			$(".side_filter_group form").addClass('in');
			$("#side_links_nav").addClass('in');
			$(".side_links_group nav").addClass('in');
		}

	}).resize();

	$(".hero-scroll").click(function() {
		$("html, body").animate({
			scrollTop: windowHeight }, 400);
	});

});
