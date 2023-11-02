ELT.settings = {
	// the date-time that the event will start in yyyy-mm-dd hh:mm+hh:mm format (24 hour with timezone offset)
	startTime: "2023-11-03 00:00-05:00",
	// the date-time the event will end
	endTime: "2023-11-03 23:59-05:00",
	// if seconds should be shown
	displaySeconds: false,
	// if a header should be displayed above the timer
	displayHeader: true,
	// header message to display before event start
	beforeStartHeader: "Starting In",
	// header message to display while the event is going
	header: "Time Left",
	// header message to display after the event ends
	afterEndHeader: "Overtime",
	// how often should data be refreshed (if you are displaying seconds set this to max. 1000)
	refreshTimeMS: 10000,
};
