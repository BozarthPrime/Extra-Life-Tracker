(function( $, currency ){
    let positionInRotation = 0;
    const baseURL = "https://www.extra-life.org/index.cfm";
    const currencyOptions = {
        formatWithSymbol: true,
        precision: 0,
        separator: ',',
    }
    const isTeamDefined = !isEmpty( settings.teamId );

    /**********
     * Main Functionality
     **********/

    /* Initial setup of the layout and theme based on user settings */
    function start() {
        if (!isTeamDefined) {
            $("#tracking-team").hide();
        }

        // if the number to display is less than the number to display
        if (settings.displayCount > settings.participantIds.length || settings.displayCount < 1) {
            settings.displayCount = settings.participantIds.length;
        }

        /* Call update to do initial populate and then repeat at interval */
        update();
        setInterval(update, settings.refreshTimeMS);
    }

    /* Main loop */
    function update() {
        if (settings.logWhenUpdating) {
            const newDate = new Date();
            dateString = newDate.toUTCString();
        }

        updateParticipants();

        if (isTeamDefined) {
            updateTeam();
        }
    }

    /**********
     * Update Helpers
     **********/

    function updateParticipants() {
        let displayingParticipants = [];

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
            const params = {
                fuseaction: 'donordrive.participant',
                participantID: displayingParticipants[i]
            };

            callAPI(params, function(result) {
                participantResults.push(result);

                if (participantResults.length == displayingParticipants.length) {
                    if (settings.logWhenUpdating) {
                        console.log(participantResults);
                    }

                    $("#participant-trackers").html("");

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

    function updateTeam() {
        const teamParams = {
            fuseaction: 'donordrive.team',
            teamID: settings.teamId
        };

        callAPI(teamParams, function(result) {
            $("#team-name").html(result.name);
            $("#team-raised").html(toCurrency(result.totalRaisedAmount));
            $("#team-goal").html(toCurrency(result.fundraisingGoal));
        });
    }

    /**********
     * General Helpers
     **********/

    function callAPI(data, callback) {
        data['format'] = 'json';
        data['timestamp'] = new Date().getTime();

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: baseURL,
            data: data,
            success: function(data) {
                callback(data);
            },
            error: function(req, status, error) {
                callback({});
            }
        });
    }

    function makeParticipantTracker(participantData) {
        const tracker = $('<div/>', {class: 'participant-tracker-container'});
        const name = $('<div/>', {class: 'name'});
        const raised = $('<div/>', {class: 'raised'});
        const raisedBar = $('<div/>', {class: 'raised-bar'});

        tracker.appendTo('#participant-trackers');
        raisedBar.appendTo(tracker);
        name.appendTo(tracker);
        raised.appendTo(tracker);

        name.html(participantData.displayName);
        // Temp
        participantData.totalRaisedAmount = Math.random() * 1000;
        participantData.fundraisingGoal = 1000;
        raisedBar.width(Math.round(participantData.totalRaisedAmount / participantData.fundraisingGoal * 100).toString() + '%');
        raised.html(toCurrency(participantData.totalRaisedAmount) + " / " + toCurrency(participantData.fundraisingGoal));
    }

    function isEmpty(value) {
        return (value == null || value === "");
    }

    function toCurrency( value ) {
        return currency(value, currencyOptions).format();
    }

    window.ELT = {
        start,
    };
})(window.jQuery, window.currency);