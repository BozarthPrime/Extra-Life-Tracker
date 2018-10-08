# Subteam Participants Goal

A widget that displays the fundraising amounts of specified of participants for when you have multiple people playing on one stream. It can also cycle through participants if you have more than you want to have displayed at a time.

![Subteam-Participants-Goal-Preview](../images/Subteam-Participants-Preview.png)

## Settings
To update the settings update their value in `subteam-participants-settings.js` with any plain text editor. If you make settings changes while the scene is active you can refresh the widget by right clicking the source, selecting "Properties" and then clicking "Refresh cache of current page".

| Name | Description | Value Type | Default value |
|---|---|---|---|
| participantIds | Extra Life participant IDs | Array of Text | Empty array |
| displayCount | How many participants to display at once. If the number of participants is larger than the display count it will cycle through them | Integer | 2 |
| refreshTimeMS | How often the data should be refreshed in milliseconds | Integer | 10000 |
| logWhenUpdating | Development setting: If the widget should log to the javascipt console when updating | Boolean | false |

### How to get someone's Participant ID

1. Go to [extra-life.org](https://www.extra-life.org/)
2. Navigate to the person's participant fundraising page
3. Copy the Participant ID out of the address bar. It is the number after "participantID" and should be at the end of the address. See example image

![Get-Participant-ID](../images/where-to-find-your-id.png)

## Setup in OBS or Streamlabs
1. In the "Sources" section click the "+" to add a new source, selecting "BrowserSource"
2. Select the "Create new" radio button
3. Set the name to something appropriate (e.x. "Extra Life Tracker - Subteam Participants")
4. Make sure "Make source visible" is checked
5. Click "OK" to create the source
6. Check "Local file"
7. Click "Browse" next to the "Local file" line and select `subteam-participants.html`
8. Set "Width" to at least 300 (the widget will fill the whole width given)
9. Set "Height" to (30 * displayCount) + 2
10. Click "OK" to finish the setup
