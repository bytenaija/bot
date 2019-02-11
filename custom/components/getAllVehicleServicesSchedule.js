const axios = require('axios');
const Promise = require('bluebird');

module.exports = {
  metadata: () => ({
    name: 'getAllVehicleServicesSchedule',
    properties: {},
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


            return result;
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

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetCountries', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;


            return countries = result;
          }
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetNonSchengenCountries', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;


            return nonSchengenCountries = result;
          }
        }),

      axios.get('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetClientCategories', {
        headers,
      })
        .then((response) => {
          if (response.data.success) {
            const {
              result,
            } = response.data;


            return travelInsuranceCategory = result;
          }
        }),
      // https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetClientCategories
    ]).spread((result, colorList, yrManf, genders, titles, bodyTypes, countries, nonSchengenCountries, travelInsuranceCategory) => {
      selectedInsurance = result.filter(insurance => insurance.name == 'Private Motor Comprehensive' || insurance.name == 'Private Motor 3rd Party');
      travelInsurance = result.filter(insurance => insurance.name == 'Travel Insurance' || insurance.name == 'Travel');
      shopInsurance = result.filter(insurance => insurance.name == 'Shop Insurance' || insurance.name == 'Shop');
      console.log(travelInsurance);
      conversation.variable('travelInsurance', travelInsurance[0].id);
      conversation.variable('shopInsurance', shopInsurance[0].id);
      conversation.variable('filteredInsurance', selectedInsurance);
      conversation.variable('colorList', colorList);
      conversation.variable('yrManf', yrManf);
      conversation.variable('titles', titles);
      conversation.variable('genders', genders);
      conversation.variable('bodyTypes', bodyTypes);
      conversation.variable('schengenCountries', countries);
      conversation.variable('nonSchengenCountries', nonSchengenCountries);
      conversation.variable('travelInsuranceCategory', travelInsuranceCategory);
      conversation.keepTurn(true);
      conversation.transition();
      done();
    });
  },
};
