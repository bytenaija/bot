const axios = require('axios');
const Promise = require('bluebird');

module.exports = {
  metadata: () => ({
    name: 'getPostCarInsuranceForm',
    properties: {
      email: {
        type: 'string',
        required: true,
      },
      phoneNumber: {
        type: 'string',
        required: true,
      },

      plateNumber: {
        type: 'string',
        required: true,
      },
      makeYear: {
        type: 'string',
        required: true,
      },

      bodyType: {
        type: 'string',
        required: true,
      },
    },
    supportedActions: [],
  }),
  invoke: (conversation, done) => {
    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      'Content-Type': 'application/json',
    };

    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';


    Promise.all([

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetProducts', {
        headers,
      })
        .then((response) => {
          let selectedInsurance;
          if (response.data.success) {
            const {
              result,
            } = response.data;


            selectedInsurance = result.filter(insurance => insurance.name == 'Private Motor Comprehensive' || insurance.name == 'Private Motor 3rd Party');


            return selectedInsurance;
          }
          conversation.keepTurn(true);
          conversation.transition();
          done();
        }).catch((err) => {
          console.log('error', err);
          conversation.keepTurn(true);
          conversation.transition();
          done();
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetColorList', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;
            const colorList = [];
            for (const idx in result) {
              colorList.push({ label: result[idx], value: result[idx] });
            }
            return colorList;
          }
          conversation.keepTurn(true);
          conversation.transition('getColorListFailure');
          done();
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetManufactureYear', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;

            const yrManf = [];
            for (const idx in result) {
              yrManf.push({ label: result[idx], value: result[idx] });
            }

            return yrManf;
          }
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetGenders', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;

            const genders = [];
            for (const idx in result) {
              genders.push({ label: result[idx].name, value: result[idx].id });
            }
            return genders;
          }
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetTitles', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;

            console.log(result);
            const titles = [];
            for (const idx in result) {
              titles.push({ label: result[idx].name, value: result[idx].id });
            }
            return titles;
          }
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetBodyTypes', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;

            const bodyTypes = [];
            for (const idx in result) {
              bodyTypes.push({ label: result[idx], value: result[idx] });
            }
            return bodyTypes;
          }
        }),


      //
    ]).spread((selectedInsurance, colorList, yrManf, genders, titles, bodyTypes) => {
      conversation.variable('filteredInsurance', selectedInsurance);
      conversation.variable('colorList', colorList);
      conversation.variable('yrManf', yrManf);
      conversation.variable('titles', titles);
      conversation.variable('genders', genders);
      conversation.variable('bodyTypes', bodyTypes);
      conversation.keepTurn(true);
      conversation.transition();
      done();
    });
  },
};
