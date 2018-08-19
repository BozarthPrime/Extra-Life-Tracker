(function( $, ELT ){
  /**********
   * Main Functionality
   **********/

  /* Initial setup of the layout and theme based on user settings */
  function start() {
    if (!ELT.settings.displayHeader) {
      $('#countdown-timer-header').hide();
    }

    update();
    setInterval(update, ELT.settings.refreshTimeMS);
  }

  /* Main loop */
  function update() {
    const $header = $('#countdown-timer-header');
    const $time = $('#countdown-timer-time');

    let $startTime = moment(ELT.settings.startTime);
    let $endTime = moment(ELT.settings.endTime);
    let $now = moment();

    let $headerValue;
    let $duration; 

    if ($startTime > $now) {
      $headerValue = ELT.settings.beforeStartHeader;
      $duration = moment.duration($startTime.diff($now)); 
    } else if ($endTime > $now) {
      $headerValue = ELT.settings.header;
      $duration = moment.duration($endTime.diff($now)); 
    } else {
      $headerValue = ELT.settings.afterEndHeader;
      $duration = moment.duration($now.diff($endTime));
    }

    let $timeValue = "";

    if ($duration.days() > 0) {
      $timeValue += getTwoDigitNumber($duration.days()) + ":";
    }

    $timeValue += getTwoDigitNumber($duration.hours()) + ":";
    $timeValue += getTwoDigitNumber($duration.minutes());

    if (ELT.settings.displaySeconds) {
      $timeValue += ":" + getTwoDigitNumber($duration.seconds());
    }
    
    // Set values
    $header.html($headerValue);
    $time.html($timeValue);
  }

  /**********
   * Helpers
   **********/
  
  function getTwoDigitNumber(number) {
    if (number > 9) {
      return number;
    } else {
      return "0" + number;
    }
  }

  start();
})(window.jQuery, window.ELT);