(function ($, ELT) {
	const settings = ELT.settings;
	let positionInRotation = 0;

	/**********
	 * Main Functionality
	 **********/

	/* Initial setup of the layout and theme based on user settings */
	function start() {
		const header = $('#header');

		if (ELT.settings.showHeader) {
			header.html(ELT.settings.headerMessage);
		} else {
			header.hide();
		}	

		// if the number to display is less than the number to display
		if (settings.displayCount > settings.participantIds.length || settings.displayCount < 1) {
			settings.displayCount = settings.participantIds.length;
		}

		/* Call update to do initial populate and then repeat at interval */
		updateParticipants();
		setInterval(updateParticipants, settings.refreshTimeMS);
	}

	/**********
	 * Update Helpers
	 **********/

	function updateParticipants() {
		const displayingParticipants = [];

		for (let i = 0; i < settings.displayCount; i++) {
			displayingParticipants.push(settings.participantIds[positionInRotation]);

			if (positionInRotation == settings.participantIds.length - 1) {
				positionInRotation = 0;
			} else {
				positionInRotation = positionInRotation + 1;
			}
		}

		let participantResults = [];

		for (let i = 0; i < displayingParticipants.length; i++) {
			ELT.api.participant(displayingParticipants[i], function (result) {
				participantResults.push(result);

				if (participantResults.length == displayingParticipants.length) {
					if (settings.logWhenUpdating) {
						console.log(participantResults);
					}

					$("#goals").html("");

					for (let j = 0; j < displayingParticipants.length; j++) {
						for (let k = 0; k < participantResults.length; k++) {
							if (participantResults[k].participantID == displayingParticipants[j]) {
								makeParticipantTracker(participantResults[k]);
							}
						}
					}
				}
			});
		}
	}

	/**********
	 * General Helpers
	 **********/

	function makeParticipantTracker(participantData) {
		const tracker = $('<div/>', { class: 'participant-tracker-container' });
		const name = $('<span/>', { class: 'name' });
		const raised = $('<span/>', { class: 'raised' });

		tracker.appendTo('#goals');
		name.appendTo(tracker);
		raised.appendTo(tracker);

		name.html(participantData.displayName);
		const raisedAmount = ELT.toCurrency(participantData.sumDonations);
		const goalAmount = ELT.toCurrency(participantData.fundraisingGoal);
		raised.html(raisedAmount + " / " + goalAmount);
	}

	start();
})(window.jQuery, window.ELT);