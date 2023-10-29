(function ($, ELT) {
    /**********
     * Main Functionality
     **********/

    var $participants = {};
    var $newDonations = [];
    var donationsSeen = 0;
    var itemsToAdd = 1;
	// Structure placeholders
    const $donation = $('#donation');
    const $participantName = $('#participant-name');
    const $trackingContainer = $('#tracking-container');
    const $header = $('#header');
    const $donationConjunction = $('#donation-conjunction');

    /* Initial setup of the layout and theme based on user settings */
    function start() {

        if (ELT.settings.showHeader) {
            $header.html(ELT.settings.headerMessage);
        } else {
            $header.remove();
        }

        if (ELT.settings.animate) {
            $trackingContainer.addClass('animate')
            // add animation direction
            .addClass(`animate-${ELT.settings.animateTo}`);
        }

        if (ELT.settings.showRecipient) {
            $donationConjunction.html(ELT.settings.conjunctionText);
        } else {
            $donationConjunction.remove();
            $participantName.remove();
        }

        ELT.api.teamParticipants(ELT.settings.teamId, function (results) {
            results.forEach(function (teamMember) {
                $participants[teamMember.participantID] = teamMember;
            });
        });

        checkForNewDonations();
        updateDonation();
        setInterval(checkForNewDonations, ELT.settings.refreshTimeMS);
        setInterval(updateDonation, ELT.settings.donationCycleMS);
    }

    /* Main loop */
    function checkForNewDonations() {
        ELT.api.teamDonations(ELT.settings.teamId, checkForNewDonationsOnSuccess);
    }

    function checkForNewDonationsOnSuccess(results) {
        if (results.length > donationsSeen) {
            if (donationsSeen == 0) {
                // Trim items if this is the first loop
                donationsSeen = results.length;
            } else {
                const newItems = results.slice(0, results.length - donationsSeen);

                $newDonations = $newDonations.concat(newItems);
                donationsSeen = results.length;
            }   
        }
    }

    function updateDonation() {
        if ($newDonations.length > 0) {
            let donationText;
            let participant;
            const curDonation = $newDonations.pop();

            if (curDonation) {
                const donorName = !curDonation.displayName ? ELT.settings.unknownDonorName : curDonation.displayName;

                participant = $participants[curDonation.participantID].displayName;
                const amount = curDonation.amount ? ELT.toCurrency(curDonation.amount) : ELT.settings.unknownDonationAmountText;
                donationText = `<span class="donor-name">${donorName}</span><span class="donor-separator">:</span><span class="donor-amount">${amount}</span>`;
            } else {
                participant = ' ';
                donationText = 'No donations';
            }

            $participantName.html(participant);
            $donation.html(donationText);

            if (ELT.settings.animate) {
                $trackingContainer.addClass('animate-in');
                setTimeout(() => {
                    $trackingContainer.removeClass('animate-in');
                }, ELT.settings.animationPauseMS);
            }
        }
    }

    start();
})(window.jQuery, window.ELT);