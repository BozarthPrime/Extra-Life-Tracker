var positionInRotation = 0;
var baseURL = "https://www.extra-life.org/index.cfm";

/**********
 * Main Functionality
 **********/

/* Initial setup of the layout and theme based on user settings */
function setup() {
    var displayTeam = settings.teamId != undefined && settings.teamId != "";
    var displayHight = 55 * settings.displayCount + (displayTeam ? 30 : 0);

    if (!displayTeam) {
        $("#tracking-team").hide();
        $("#participant-trackers").css({ top: '2px' });
    }

    if (settings.displayCount > settings.participantIds.length || settings.displayCount < 1) {
        settings.displayCount = settings.participantIds.length;
    }

    /* Use default values in undefined or empty except in the case of backgroundColor to allow transparent */
    $("#tracking-container").css({
        height: displayHight +'px',
        color: isDefined(settings.fontColor) ? settings.fontColor : "#000000",
        "border-color": isDefined(settings.borderColor) ? settings.borderColor : "#000000",
        "background-color": settings.backgroundColor != undefined ? settings.backgroundColor : "",
        opacity: isDefined(settings.opacity) ? settings.opacity : 1,
    });

    $("#tracking-team").css({
        "border-color": isDefined(settings.borderColor) ? settings.borderColor : "#000000"
    });

    return;
}

/* Main loop */
function update() {
    if (settings.logWhenUpdating) {
        var newDate = new Date();
        dateString = newDate.toUTCString();
        console.log("Updating - " + dateString);
    }

    updateParticipants();

    if (settings.teamId != undefined && settings.teamId != "") {
        updateTeam();
    }
}

/**********
 * Update Helpers
 **********/

function updateParticipants() {
    var displayingParticipants = [];

    for (var i = 0; i < settings.displayCount; i++) {
        displayingParticipants.push(settings.participantIds[positionInRotation]);

        if (positionInRotation == settings.participantIds.length - 1) {
            positionInRotation = 0;
        } else {
            positionInRotation = positionInRotation + 1;
        }
    }

    var participantResults = [];

    for (var i = 0; i < displayingParticipants.length; i++) {
        var params = {
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

                for (var j = 0; j < displayingParticipants.length; j++) {
                    for (var k = 0; k < participantResults.length; k++) {
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
    var teamParams = {
        fuseaction: 'donordrive.team',
        teamID: settings.teamId
    };

    callAPI(teamParams, function(result) {
        $("#team-name").html(result.name);
        $("#team-raised").html(result.totalRaisedAmount);
        $("#team-goal").html(result.fundraisingGoal);
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
    var tracker = $('<div/>', {class: 'participant-tracker-container'});
    var name = $('<div/>', {class: 'name'});
    var raised = $('<div/>', {class: 'raised'});

    tracker.appendTo('#participant-trackers');
    name.appendTo(tracker);
    raised.appendTo(tracker);

    name.html(participantData.displayName);
    raised.html("$" + participantData.totalRaisedAmount + "/$" + participantData.fundraisingGoal);

    return;
}

function isDefined(value) {
    if (value != undefined && value != "") {
        console.log(true);
        return true;
    }
    console.log(false);
    return false;
}
