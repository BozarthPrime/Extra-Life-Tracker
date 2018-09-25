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

window.ELT = {
	isEmpty: function(value) {
		return (value == null || value === "");
	},

	toCurrency: function( value ) {
		return currency(value, currencyOptions).format();
	},

	api: {
		participant: createApiActionFor('participants/{}'),
		team: createApiActionFor('teams/{}'),
		donations: createApiActionFor('participants/{}/donations'),
	},
};
