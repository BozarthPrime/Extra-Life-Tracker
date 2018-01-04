# Extra Life Tracker

## Overview
This is a web page that can be used as a web source in streaming software such as OBS to display your and your team's current Extra Life fund raising status and goal. It is configurable to be able to display just your stats, your stats and that of your teams, several individuals, or several individuals and a team. It can also, if you have many individuals, cycle through whose stats it is displaying. The goal of this project was to make an easy way to display the stats of multiple people that are all on the same stream during Extra Life so it is easy for viewers to see where they are all at in their goals.

## Setup

### Configuration
Copy settings.example.js to settings.js and open it in a text editor and you will see an object called `settings`. To change your settings you just need to update this object.

- participantIds: An array of Extra Life participant IDs (you can obtain this by going to your Extra Life page and looking at the URL. The end of it will say `participantID=` followed by your participant ID). You can have as many here as you like. Wrap them in quotes as the app treats them as strings.
- displayCount: How many of the specified participants to display at a time. If you have many participants you would like to display but do not want to use up all the room to display them all at once you can set this to a smaller number, say two or three, and it will cycle through displaying the set amount at a time.
- teamId: The ID of your team (you can obtain this by going to your team page and looking at the URL. The end of it will say `teamID=` followed by your team ID). If set to an empty string the team tracker will be hidden.
- refreshTimeMS: The interval to refresh the tracker at in MS. A reasonable default is 30000 (30 seconds).
- fontColor: The hex of the font color you want to use.
- borderColor: The hex of the border color you want to use.
- backgroundColor: The hex of the background color you want to use.
- opacity: A number between 0 and 1 that is the opacity you want to use. The lower the setting the more transparent it will be.
- logWhenUpdating: This is a debugging option that you can use if you are testing your settings in a normal browser. If this is true it will log when it is updating and the participant results of the update to the browser console.

### Setup in OBS
1. Add a new BrowserSource and give it a name (e.g. "Extra Life Tracker")
2. Tick the Local File box
3. Click the browse button next to the Local File line and select extra-life-tracker.html
4. Set the width to 264
5. Set the height with this formula: 4 + 30 if you are displaying a team + 55 x the number of participants you are displaying at a time
    - Example 1: To display one participant and a team you would have 4 + 30 + (55 x 1) = 89
    - Example 2: To display 3 participants with no team you would have 4 + (55 x 3) = 169
6. Click OK

## Credits
Jovanny Lemonad for the freeware font Furore which can be found at https://www.fontsquirrel.com/fonts/Furore

## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
