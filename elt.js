const currencyOptions = {
	formatWithSymbol: true,
	precision: 2,
	separator: ',',
};
const baseURL = "https://www.extra-life.org/api/";

function createApiActionFor(fuseaction){
	return function(data, callback) {
		let timestamp = {
			timestamp: new Date().getTime()
		};
		
		$.ajax({
			type: 'GET',
			url: baseURL + fuseaction.replace("{}", data),
			timestamp,
			success: callback,
			error: function() {
				callback({});
			}
		});
	};
}

function createDateApiActionFor(fuseaction){
	return function(data, callDate, callback) {
		let timestamp = {
			timestamp: new Date().getTime()
		};

		let callURL = baseURL + fuseaction.replace("{}", data);
		callURL = callURL.replace("[]", 
			callDate.getUTCFullYear() + 
			"-" + (callDate.getUTCMonth() + 1) + 
			"-" + callDate.getUTCDate() +
			"T" + callDate.getUTCHours() +
			":" + callDate.getUTCMinutes() +
			":" + callDate.getUTCSeconds() +
			"." + callDate.getUTCMilliseconds());
		
		$.ajax({
			type: 'GET',
			url: callURL,
			timestamp,
			success: callback,
			error: function() {
				callback({});
			}
		});
	};
}

window.ELT = {
	isEmpty: function(value) {
		return (value == null || value === "");
	},

	toCurrency: function( value ) {
		return currency(value, currencyOptions).format();
	},

	api: {
		participant: createApiActionFor('participants/{}'),
		participantDonations: createApiActionFor('participants/{}/donations'),
		participantDonationsAfterDate: createDateApiActionFor('participants/{}/donations?where=createdDateUTC>[]'),
		team: createApiActionFor('teams/{}'),
		teamParticipants: createApiActionFor('teams/{}/participants'),
		teamDonations: createDateApiActionFor('teams/{}/donations'),
		teamDonationsAfterDate: createDateApiActionFor('teams/{}/donations?where=createdDateUTC>[]'),
	},
};
