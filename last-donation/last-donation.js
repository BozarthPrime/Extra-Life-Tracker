(function ($, ELT) {
    /**********
     * Main Functionality
     **********/

    var $participants = {};
    var $newDonations = [];
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

        ELT.settings.participantIds.forEach(function (participantId) {
            ELT.api.participant(participantId, function (result) {
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
        ELT.settings.participantIds.forEach(function (participantId) {
            ELT.api.participantDonations(participantId, checkForNewDonationsOnSuccess);
        });
    }

    function checkForNewDonationsOnSuccess(results) {
        if (results.length > 0) {
            const curParticipant = $participants[results[0].participantID];

            if (curParticipant != null && results.length > curParticipant.donationsSeen) {
                if (curParticipant.donationsSeen == 0) {
                    // Trim items if this is the first loop
                    curParticipant.donationsSeen = results.length;
                } else {
                    // Add new items to be displayed
                    const newItems = results.slice(0, results.length - curParticipant.donationsSeen);

                    $newDonations = $newDonations.concat(newItems);
                    curParticipant.donationsSeen = results.length;
                }
            }
        }
    }

    function updateDonation() {
        if ($newDonations.length > 0) {
            let donationText;
            let participant;
            let soundList;
            const curDonation = $newDonations.pop();

            if (curDonation) {
                const donorName = !curDonation.displayName ? ELT.settings.unknownDonorName : curDonation.displayName;

                participant = $participants[curDonation.participantID].displayName;

                const incentive = ELT.settings.incentives[curDonation.incentiveID];
                let incentiveText;

                if (incentive) {
                    soundList = incentive.incentiveSoundList;
                    incentiveText = incentive.incentiveText;
                } else {
                    soundList = ELT.settings.soundList;
                }

                if (incentiveText) {
                    donationText = `<span class="donor-name">${donorName}</span><span class="donor-separator">:</span><span class="donor-amount">${incentiveText}</span>`;
                } else {
                    const amount = curDonation.amount ? ELT.toCurrency(curDonation.amount) : ELT.settings.unknownDonationAmountText;
                    donationText = `<span class="donor-name">${donorName}</span><span class="donor-separator">:</span><span class="donor-amount">${amount}</span>`;
                }
            } else {
                participant = ' ';
                donationText = 'No donations';
            }

            $participantName.html(participant);
            $donation.html(donationText);

            if (soundList.length > 0) {
                var track = soundList[Math.floor((Math.random() * soundList.length))];
                var audio = new Audio(track);
                audio.play();
            }

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