(function( $, ELT ){
    /**********
     * Main Functionality
     **********/

	var teamMembers = {};
	var newDonations = [];
	var donationsSeen = 0;
	var itemsToAdd = 1;

    /* Initial setup of the layout and theme based on user settings */
    function start() {
		const header = $('#header');

		if (ELT.settings.showHeader) {
			header.html(ELT.settings.headerMessage);
		} else {
			header.hide();
		}

		$('#donation-conjunction').html(ELT.settings.conjunctionText);

		ELT.api.teamParticipants(ELT.settings.teamId, function(results) {
			results.forEach(function(teamMember) {
				teamMembers[teamMember.participantID] = teamMember;
			});
			
			checkForNewDonations();
			updateDonation();
			setInterval(checkForNewDonations, ELT.settings.refreshTimeMS);
			setInterval(updateDonation, ELT.settings.donationCycleMS); 
		});   
	}

    /* Main loop */
    function checkForNewDonations() {
		ELT.api.teamDonations(ELT.settings.teamId, checkForNewDonationsOnSuccess);
    }

    function checkForNewDonationsOnSuccess(result) {
		if (result.length > donationsSeen) {
			const newItems = result.slice(0, result.length - donationsSeen);
			
			newDonations = newDonations.concat(newItems);
			donationsSeen = result.length;
		}
	}
	
	function updateDonation() {
		if (newDonations.length > 0) {
			const $donation = $('#donation');
			const $participantName = $('#participant-name');
			let value;
			let participant;
			const lastDonation = newDonations.pop();

			if( lastDonation ){
				const amount = ELT.toCurrency(lastDonation.amount);
				const donorName = lastDonation.displayName == null ? 
					ELT.settings.unknownDonorName : lastDonation.displayName;
				
				participant = teamMembers[lastDonation.participantID].displayName;
				value = `${donorName}: ${amount}`;
			} else {
				participant = ' ';
				value = 'No donations';
			}

			$participantName.html( participant );
			$donation.html( value );
		}
	}

    start();
})(window.jQuery, window.ELT);