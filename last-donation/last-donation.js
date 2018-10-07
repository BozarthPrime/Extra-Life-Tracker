(function( $, ELT ){
    /**********
     * Main Functionality
     **********/

	var $participants = {};
	var $newDonations = [];
	const $donation = $('#donation');
	const $participantName = $('#participant-name');

    /* Initial setup of the layout and theme based on user settings */
    function start() {
		const donationHeader = $('#last-donation-header');
		const donationConjunction = $('#donation-conjunction');

		if (ELT.settings.showHeader) {
			donationHeader.html(ELT.settings.headerMessage);
		} else {
			donationHeader.hide();
		}	

		if (ELT.settings.showRecipiant) {
			donationConjunction.html(ELT.settings.conjunctionText);
		} else {
			donationConjunction.hide();
			$participantName.hide();
		}
		
		ELT.settings.participantIds.forEach(function(participantId) {
			ELT.api.participant(participantId, function(result) {
				result['donationsSeen'] = 0;
				$participants[result.participantID] = result;
			});
		});

		checkForNewDonations();
        updateDonation();
		setInterval(checkForNewDonations, ELT.settings.refreshTimeMS);
		setInterval(updateDonation, ELT.settings.donationCycleMS); 
	}	

	/* Main loop */
    function checkForNewDonations() {
		ELT.settings.participantIds.forEach(function(participantId) {
			ELT.api.participantDonations(participantId, checkForNewDonationsOnSuccess);
		});	
    }

    function checkForNewDonationsOnSuccess(results) {
		if (results.length > 0) {
			const curParticipant = $participants[results[0].participantID];

			if (curParticipant != null && results.length > curParticipant.donationsSeen) {
				const newItems = results.slice(0, results.length - curParticipant.donationsSeen);
				
				$newDonations = $newDonations.concat(newItems);
				curParticipant.donationsSeen = results.length;
			}
		}
	}
	
	function updateDonation() {
		if ($newDonations.length > 0) {
			let donationText;
			let participant;
			const curDonation = $newDonations.pop();

			if( curDonation ){
				const amount = ELT.toCurrency(curDonation.amount);
				const donorName = curDonation.displayName == null ? 
					ELT.settings.unknownUsername : curDonation.displayName;
				
				participant = $participants[curDonation.participantID].displayName;
				donationText = `${donorName}: ${amount}`;
			} else {
				participant = ' ';
				donationText = 'No donations';
			}

			$participantName.html( participant );
			$donation.html( donationText );
		}
	}

    start();
})(window.jQuery, window.ELT);