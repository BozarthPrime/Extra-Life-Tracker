(function( $, ELT ){
	/**********
	 * Main Functionality
	 **********/

	/* Initial setup of the layout and theme based on user settings */
	function start() {
	if (!ELT.settings.displayHeader) {
		$('#header').hide();
	}

	update();
		setInterval(update, ELT.settings.refreshTimeMS);
	}

	/* Main loop */
	function update() {
		const $header = $('#header');
		const $time = $('#countdown-timer-time');

		let $startTime = moment(ELT.settings.startTime);
		let $endTime = moment(ELT.settings.endTime);
		let $now = moment();

		let $headerValue;
		let $duration; 

		if ($startTime > $now) {
			$headerValue = ELT.settings.beforeStartHeader;
			$duration = moment.duration($startTime.diff($now)); 
		} else if ($endTime > $now) {
			$headerValue = ELT.settings.header;
			$duration = moment.duration($endTime.diff($now)); 
		} else {
			$headerValue = ELT.settings.afterEndHeader;
			$duration = moment.duration($now.diff($endTime));
		}

		let $timeValue = "";

		if ($duration.asDays() > 0) {
			$timeValue += Math.trunc($duration.asDays()).toString().padStart(2, "0") + ":";
		}

		$timeValue += $duration.hours().toString().padStart(2, "0") + ":";
		$timeValue += $duration.minutes().toString().padStart(2, "0");

		if (ELT.settings.displaySeconds) {
			$timeValue += ":" + $duration.seconds().toString().padStart(2, "0");
		}

		// Set values
		$header.html($headerValue);
		$time.html($timeValue);
	}

	start();
})(window.jQuery, window.ELT);
