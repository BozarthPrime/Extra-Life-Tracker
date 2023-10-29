(function ($, ELT) {
    /**********
     * Main Functionality
     **********/

    var $participants = {};
    const $incentives = $('#incentives');
    const $configOutput = $('#configOutput');

    ELT.settings.participantIds.forEach(function (participantId) {
        ELT.api.participantIncentives(participantId, function (result) {
            console.log(result);
            $incentives.html("incentives: {<br/>")
            result.forEach(function (incentive) {
                $incentives.append("    \"" + incentive.incentiveID + "\": {<br/>"
                     + "        \"incentiveText\": \"" + incentive.description + "\",<br/>"
                     + "        \"incentiveSoundList\": [\"ExampleSound.ogg\"]<br/>"
                     + "    },<br/>")
            });
            incentives.append("}");
        });
    });

})(window.jQuery, window.ELT);