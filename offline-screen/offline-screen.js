(function( $, ELT ){
	/**********
	 * Main Functionality
	 **********/

	/* Set message */
	function start() {
		const $backgroundImage = $('#offline-image');

		if (!ELT.settings.useBackgroundImage) {
			$backgroundImage.hide();
		} else {
			$backgroundImage.attr('src', ELT.settings.backgroundImage);
		}

		const $music = $('#offline-music');
		const $musicTrack = $('#offline-music-track');

		if (!ELT.settings.playMusic) {
			$music.get(0).pause();
		} else {
			$musicTrack.attr('src', ELT.settings.music);
		}

		const $message = $('#offline-message');
		$message.html(ELT.settings.message);
	}

	start();
})(window.jQuery, window.ELT);
