(function ($, ELT) {
    /**********
     * Main Functionality
     **********/

    var $participants = {};
    var $newDonations = [];
    var lastDonationDate = new Date();
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

        if (ELT.settings.animate) {
            $trackingContainer.addClass('animate')
            // add animation direction
            .addClass(`animate-${ELT.settings.animateTo}`);
        } else {
            // If we are not animating we should get the most recent donation
            // to display
            ELT.api.teamDonations(
                ELT.settings.teamId, 
                function (results) {
                    if (results.length > 0) {
                        $newDonations = $newDonations.concat(results[0]);
                        lastDonationDate = new Date(results[0].createdDateUTC);
                    }

                    updateDonation();
                }
            );
        }

        setInterval(checkForNewDonations, ELT.settings.refreshTimeMS);
        setInterval(updateDonation, ELT.settings.donationCycleMS);
    }

    /* Main loop */
    function checkForNewDonations() {
        ELT.api.teamDonationsAfterDate(
            ELT.settings.teamId, 
            lastDonationDate, 
            checkForNewDonationsOnSuccess
        );
    }

    function checkForNewDonationsOnSuccess(results) {
        if (results.length > 0) {
            $newDonations = $newDonations.concat(results);
            lastDonationDate = new Date(results[0].createdDateUTC);
        } else {
            console.log("No new donations");
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