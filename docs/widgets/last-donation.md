# Last Donation

Displays the name of the last donator and amount they donated to a specified participant or set of participants campaigns.

![Last-Donation-Preview](../images/Last-Donation-Preview.png)

## Settings
To update the settings update their value in `last-donation-settings.js` with any plain text editor. If you make settings changes while the scene is active you can refresh the widget by right clicking the source, selecting "Properties" and then clicking "Refresh cache of current page".

| Name | Description | Value Type | Default value |
|---|---|---|---|
| participantIds | Extra Life participant IDs | Array of Text | Empty array |
| unknownDonorName | Donor name to show if the donor name is null | Text | "Mysterious Hero" |
| showHeader | If the header message should be shown | Boolean | false |
| headerMessage | Header message to display at the top of the widget| Text | "Last Donation" |
| showRecipiant | How often the data should be refreshed in milliseconds | Boolean | false |
| conjunctionText | Text to use between the donation and the participant name if the recipiant is being shown | Text | "donated to" |
| donationCycleMS | How long to display each donation before going to the next. | Integer | 20000 |
| refreshTimeMS | How often the data should be refreshed in milliseconds | Integer | 20000 |

### How to get someone's Participant ID

1. Go to [extra-life.org](https://www.extra-life.org/)
2. Navigate to the person's participant fundraising page
3. Copy the Participant ID out of the address bar. It is the number after "participantID" and should be at the end of the address. See example image

![Get-Participant-ID](../images/where-to-find-your-id.png)

## Setup in OBS or Streamlabs
1. In the "Sources" section click the "+" to add a new source, selecting "BrowserSource"
2. Select the "Create new" radio button
3. Set the name to something appropriate (e.x. "Extra Life Tracker - Last Donation")
4. Make sure "Make source visible" is checked
5. Click "OK" to create the source
6. Check "Local file"
7. Click "Browse" next to the "Local file" line and select `last-donation.html`
8. Set "Width" to at least 300 (the widget will fill the whole width given)
9. Set "Height" to 41 (+28 with header, +35 with recipiant)
10. Click "OK" to finish the setup
