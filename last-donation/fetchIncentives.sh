#!/bin/bash

while [ -z "$participantId" ]
do
	read -p "User's Participant ID:" participantId
done

body=$(curl --location https://www.extra-life.org/api/participants/${participantId}/incentives)

echo $body | jq 'reduce .[] as $i ({}; .[$i.incentiveID] = {incentiveText: $i.description, incentiveSoundList: []})' > incentives.json

echo "File incentives.json contains the incentives for user $participantId formatted for the last-donation-settings.js file."