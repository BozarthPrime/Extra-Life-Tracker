(function ($, ELT) {
    /**********
     * Main Functionality
     **********/

    var $participants = {};
    const $incentivesHeader = $('#incentivesHeader');
    const $incentivesBody = $('#incentivesBody');
    const $incentivesFooter = $('#incentivesFooter');

    $incentivesHeader.html("incentives: {<br/>")
    $incentivesFooter.html("}");
    ELT.settings.participantIds.forEach(function (participantId) {
        ELT.api.participantIncentives(participantId, function (result) {
            console.log(result);
            result.forEach(function (incentive) {
                $incentivesBody.append("    \"" + incentive.incentiveID + "\": {<br/>"
                     + "        \"incentiveText\": \"" + incentive.description + "\",<br/>"
                     + "        \"incentiveSoundList\": [\"ExampleSound.ogg\"]<br/>"
                     + "    },<br/>")
            });
        });
    });

})(window.jQuery, window.ELT);