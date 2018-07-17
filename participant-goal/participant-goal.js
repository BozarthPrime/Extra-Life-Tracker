(function( $, ELT ){
  /**********
   * Main Functionality
   **********/

  /* Initial setup of the layout and theme based on user settings */
  function start() {
    update();
    setInterval(update, ELT.settings.refreshTimeMS);
  }

  /* Main loop */
  function update() {
    ELT.api.participant({ participantID: ELT.settings.participantId }, onSuccess);
  }

  function onSuccess(result) {
    const $raised = $('#raised');
    const $goal = $('#goal');
    $raised.html(ELT.toCurrency(result.totalRaisedAmount));
    $goal.html(ELT.toCurrency(result.fundraisingGoal));
  }

  start();
})(window.jQuery, window.ELT);