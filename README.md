# Extra Life Tracker

## Overview
Extra Life Tracker is a collection of web pages that can be used as a web source in streaming software such as OBS to display your and your team's current Extra Life fund raising status and goal.

## Widgets

### [Last Donation](/last-donation)
Displays the last donation for the specified participant.

### [Participant Goal](/participant-goal)
Displays amount raised and goal for the specified participant.

### [Subteam Participants](/subteam-participants)
Cycles through the fundraising amounts of a specified number of participants.

### [Team Goal](/team-goal)
Displays amount raised and goal for the specified team.

## Setup in OBS
1. Add a new BrowserSource and give it a name (e.g. "Extra Life Tracker")
2. Tick the Local File box
3. Click the browse button next to the Local File line and select extra-life-tracker.html
4. Set the width to whatever your desired width is. The list will automatically adjust to the defined width.
5. Set the height to something large like 500. The end height will be directly proportional to the `displayCount` you define within settings.js. Just make sure to set the height large enough to account for the number being displayed. For example, displaying a team along with 2 participants at a time, your minimum height needs to be 125.
6. Click OK

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
