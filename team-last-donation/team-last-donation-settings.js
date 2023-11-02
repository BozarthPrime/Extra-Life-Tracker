ELT.settings = {
    // animate the last donation instead of persist on screen
    animate: true,
    // animation pause duration
    animationPauseMS: 5000,
    // direction of animation
    animateTo: 'left',
    // get donation information for this team
    teamId: "64243",
    // name to show if the donor name is null
    unknownDonorName: "Mysterious Hero",
    // Message displayed when donation amount it private to the donatee
    unknownDonationAmountText: "Private Donation",
    // if the header message should be shown
    showHeader: true,
    // header message to display at the top of the widget
    headerMessage: "New Donation!",
    // text to use between the donation and the participant name
    conjunctionText: "donated to",
    // if the recipiant of the donation should be shown. This is meant
    // for when you have more than one participantID
    showRecipient: true,
    // how long to display each donation before going to the next.
    donationCycleMS: 10000,
    // how often should data be refreshed
    refreshTimeMS: 15000,
};