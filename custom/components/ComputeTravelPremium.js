const axios = require('axios');
const moment = require('moment');

module.exports = {
  metadata: () => ({
    name: 'ComputeTravelPremium',
    properties: {
      countryId: { type: 'string', required: true },
      dateOfBirth: { type: 'string', required: true },
      startDate: { type: 'string', required: true },
      endDate: { type: 'string', required: true },
    },
    supportedActions: ['travelInsuranceNotDefined'],
  }),
  invoke: (conversation, done) => {
    let {
      countryId,
      dateOfBirth,
      startDate,
      endDate,
    } = conversation.properties();
    dateOfBirth = moment(dateOfBirth).format('YYYY/MM/DD');
    endDate = moment(endDate).toISOString();
    startDate = moment(startDate).toISOString();

    console.log('End - start', endDate, startDate, countryId, dateOfBirth);
    const data = {
      destinationCountryId: countryId,
      dateOfBirth,
      startDate,
      endDate,
    };
    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
    };

    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

    axios.post('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/ComputeTravelPremium', data, {
      headers,
    })
      .then((response) => {
        console.log('Dataddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', response.data);

        if (response.data.success) {
          const {
            result,
          } = response.data;

          conversation.variable('premium', result.premium);
          conversation.variable('currency', result.currency);
          conversation.variable('sumAssured', result.sumAssured);
          conversation.variable('premium', result.premium);
          conversation.keepTurn(true);
          conversation.transition();
          done();
        } else {
          console.log('Dataddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', response.data);
          const msg = response.data.error.message;
          conversation.reply(msg)
            .transition('travelInsuranceNotDefined');
          done();
        }
      }).catch((err) => {
        console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', err.response.data.error.message);
        const msg = err.response.data.error.message;
        conversation.reply(msg)
          .transition('travelInsuranceNotDefined');
        conversation.keepTurn(true);
        conversation.transition('travelInsuranceNotDefined');
        done();
      });
  },
};
