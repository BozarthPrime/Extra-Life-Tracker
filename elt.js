const currencyOptions = {
  formatWithSymbol: true,
  precision: 2,
  separator: ',',
};
const baseURL = "https://www.extra-life.org/index.cfm";

function createApiActionFor(fuseaction){
  return function(data, callback) {
    Object.assign(data, {
      fuseaction: `donordrive.${fuseaction}`,
      format: 'json',
      timestamp: new Date().getTime(),
    });
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: baseURL,
      data,
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
    participant: createApiActionFor('participant'),
    team: createApiActionFor('team'),
    donations: createApiActionFor('participantDonations'),
  },
};
