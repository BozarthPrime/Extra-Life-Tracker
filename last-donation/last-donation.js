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
    ELT.api.donations({ participantID: ELT.settings.participantId }, onSuccess);
  }

  function onSuccess(result) {
    const $container = $('#tracking-container');
    let value;
    const lastDonation = result[0];
    
    if( lastDonation ){
      const amount = ELT.toCurrency(lastDonation.donationAmount);
      value = `${lastDonation.donorName}: ${amount}`;
    }
    else {
      value = 'No donations'
    }
    $container.html( value );
  }

  start();
})(window.jQuery, window.ELT);