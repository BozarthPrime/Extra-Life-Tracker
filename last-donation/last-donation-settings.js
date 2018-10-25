ELT.settings = {
	// animate the last donation instead of persist on screen
	animate: true,
	// animation pause duration
	animationPauseMS: 5000,
	// get donation information for this team
	participantIds: ["297051"],
	// name to show if the donor name is null
	unknownDonorName: "Mysterious Hero",
	// Message displayed when donation amount it private to the donatee
	unknownDonationAmountText: "Private Donation",
	// if the header message should be shown
	showHeader: false,
	// header message to display at the top of the widget
	headerMessage: "Last Donation",
	// if the recipiant of the donation should be shown. This is meant
	// for when you have more than one participantID
	showRecipient: false,
	// text to use between the donation and the participant name if the
	// recipiant is being shown
	conjunctionText: "donated to",
	// how long to display each donation before going to the next.	
	donationCycleMS: 10000,
	// how often should data be refreshed
	refreshTimeMS: 10000,
};
