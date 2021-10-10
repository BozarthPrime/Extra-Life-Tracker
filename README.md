# ![Extra-Life-Tracker-Header](docs/images/Extra-Life-Traker-Header.png)

# Overview
Extra Life Tracker is a collection of web pages that can be used as a web source in streaming software such as OBS to display your and your team's current Extra Life fund raising status and goal.

More in-depth information can be found on on [project page](https://bozarthprime.github.io/Extra-Life-Tracker/).

# Widgets

## [Countdown Timer](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/countdown-timer)
## ![Countdonw-Timer-Preview](docs/images/Countdown-Timer-Preview.png)
Displays the amount of time left in your event or the time left till your event starts if it is before the start of your event.

<hr />

## [Last Donation](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/last-donation)
## ![Last-Donation-Preview](docs/images/Last-Donation-Preview.png)
Displays the last donation for the specified participant or set of participants.

<hr />

## [Donation Rotation](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/donation-rotation)
## ![Donation-Rotation-Preview](docs/images/Last-Donation-Preview.png)
Like Last Donation but it will continually loop through all donations recived instead of just showing the latest ones as they arrive.

<hr />

## [Participant Goal](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/participant-goal)
## ![Paticipant-Goal-Preview](docs/images/Participant-Goal-Preview.png)
Displays amount raised and goal for the specified participant.

<hr />

## [Subteam Participants](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/subteam-participants)
## ![Subteam-Participants-Preview](docs/images/Subteam-Participants-Preview.png)
Cycles through the fundraising amounts of a specified number of participants.

<hr />

## [Team Goal](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/team-goal)
## ![Team-Goal-Preview](docs/images/Team-Goal-Preview.png)
Displays amount raised and goal for the specified team.

<hr />

## [Team Last Donation](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/team-last-donation)
## ![Team-Last-Donation-Preview](docs/images/Team-Last-Donation-Preview.png)
Displays the last donation for the specified team.

<hr />

## [Offline Screen](https://bozarthprime.github.io/Extra-Life-Tracker/widgets/offline-screen)
## ![Offline-Screen-Preview](docs/images/Offline-Screen-Preview.png)
Displays an offline message and optionally plays elevator music.

# Configuration
Each widget has a `[widget-name]-settings.js` file in its folder (e.x. `participant-goal-settings.js`), to set up the widget just update the values in there with the correct values you would like to use. There are full descriptions of the values in the settings files for each widget.

# Themes
There are several included themes with Extra-Life-Tracker. The default theme uses the classica offical Extra Life colors but you can switch between any of them by simply copying the contents of one of the `styles-<theme name>.css`, deleting everything in `styles.css`, and replacing it with the chosen theme contents.

## Making your own theme
The easiest way to make your own theme is to just start experimenting. Open one of the widgets in a browser by dragging the HTML file into your browser window and then start making changes to `styles.css`. You can check your changes by hitting refresh in the browser. If you want to submit a theme so others can use it just make a file in the root directory named `styles-<theme name>.css` (ex. `styles-grey.css`) with the styles for your theme and open a pull request.

# Setup in OBS or Streamlabs
1. Add a new BrowserSource and give it a name (e.x. "Extra Life Tracker - Team Goal")
2. Tick the Local File box
3. Click the browse button next to the Local File line and select the html file of the widget you want to add
4. Set the width to whatever your desired width is (300 is a goo starting point). The list will automatically adjust to the defined width
5. Set the height according the what widget you are adding
	- Countdown Timer: 69
	- Last Donation: 41 (+28 with header, +35 with recipiant)
	- Participant Goal: 41 (+28 with header)
	- Subteam Participants: (30 * number of configured participants to display at a time) + 2 (+28 with header)
	- Team Goal: 74
	- Team Last Donation: 76 (+28 with header)
6. Click OK
7. Repeat for all widgets you wish to use


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

## Attributions
Music: The Elevator Bossa Nova from Bensound.com
