(function( $, ELT ){
	/**********
	 * Main Functionality
	 **********/

	/* Initial setup of the layout and theme based on user settings */
	function start() {
		update();
		setInterval(update, ELT.settings.refreshTimeMS);
	}

	/* Main loop */
	function update() {
		ELT.api.team(ELT.settings.teamId, onSuccess);
	}

	function onSuccess(result) {
		const $raised = $('#raised');
		const $goal = $('#goal');
		const $header = $('#header');
		$header.html(`${result.name} Goal`);
		$raised.html(ELT.toCurrency(result.sumDonations));
		$goal.html(ELT.toCurrency(result.fundraisingGoal));
	}

	start();
})(window.jQuery, window.ELT);