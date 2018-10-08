# Countdown Timer

Displays the amount of time left in your event or the time left till your event starts if it is before the start of your event.

![Countdown-Timer-Preview](../images/Countdown-Timer-Preview.png)

## Settings
To update the settings update their value in `countdown-timer-settings.js` with any plain text editor. If you make settings changes while the scene is active you can refresh the widget by right clicking the source, selecting "Properties" and then clicking "Refresh cache of current page".

| Name | Description | Value Type | Default value |
|---|---|---|---|
| startTime | The date-time that the event will start in yyyy-mm-dd hh:mm+hh:mm format (24 hour with timezone offset) | Date | "2018-11-03 00:00-05:00" |
| endTime | the date-time the event will end in the same format as startTime | Date | "2018-11-03 23:59-05:00" |
| displaySeconds | If seconds should be displayed | Boolean | false |
| displayHeader | If the set header text should be displayed | Boolean | true |
| beforeStartHeader | Header message to display before event starts | Text | "Starting In" |
| header | Header message to displayed while the event is going | Text | "Time Left" |
| afterEndHeader | Header message to display after the event ends | Text | "Overtime" |
| refreshTimeMS | How often the data should be refreshed in milliseconds. If you are displaying seconds set this to 1000 | Integer | 10000 |

## Setup in OBS or Streamlabs
1. In the "Sources" section click the "+" to add a new source, selecting "BrowserSource"
2. Select the "Create new" radio button
3. Set the name to something appropriate (e.x. "Extra Life Tracker - Last Donation")
4. Make sure "Make source visible" is checked
5. Click "OK" to create the source
6. Check "Local file"
7. Click "Browse" next to the "Local file" line and select `countdown-timer.html`
8. Set "Width" to at least 300 (the widget will fill the whole width given)
9. Set "Height" to 69
10. Click "OK" to finish the setup
