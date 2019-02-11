
const axios = require('axios');
const {inspect} = require('util')

module.exports = {
  metadata: () => ({
    name: 'postTravelInsuranceSchedule',
    properties: {
      name: {
        required: false,
        type: String,
      },
      countryId: {
        required: false,
        type: String,
      },
      wef: {
        required: false,
        type: String,
      },
      wet: {
        required: false,
        type: String,
      },
      nokName: {
        required: false,
        type: String,
      },
      nokRelationship: {
        required: false,
        type: String,
      },
      nokaddr: {
        required: false,
        type: String,
      },
      travelParty: {
        required: false,
        type: String,
      },
      groupType: {
        required: false,
        type: String,
      },
      currency: {
        required: false,
        type: String,
      },
      travelPurpose: {
        required: false,
        type: String,
      },
      preMedical: {
        required: false,
        type: String,
      },
      medical: {
        required: false,
        type: String,
      },
      sumAssured: {
        required: false,
        type: String,
      },
      passportNumber: {
        required: false,
        type: String,
      },
      premium: {
        required: false,
        type: String,
      },
      firstName: {
        required: false,
        type: String,
      },
      lastName: {
        required: false,
        type: String,
      },
      dateOfBirth: {
        required: false,
        type: String,
      },
      pryEmail: {
        required: false,
        type: String,
      },
      physicalAddress: {
        required: false,
        type: String,
      },
      smsTel: {
        required: false,
        type: String,
      },
      productId: {
        required: false,
        type: String,
      },
      titleId: {
        required: false,
        type: String,
      },
      genderId: {
        required: false,
        type: String,
      },


    },
    supportedActions: ['travelFailure', 'travelError'],
  }),
  invoke: (conversation, done) => {
    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      'Content-Type': 'application/json',
    };

    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

    const {
      name,
      countryId,
      wef,
      wet,
      nokName,
      nokRelationship,
      nokaddr,
      travelParty,
      groupType,
      currency,
      travelPurpose,
      medical,
      preMedical,
      sumAssured,
      passportNumber,
      premium,
      firstName,
      lastName,
      dateOfBirth,
      pryEmail,
      physicalAddress,
      smsTel,
      productId,
      titleId,
      genderId,

    } = conversation.properties();

    const data = {
      name,
      countryId,
      wef,
      wet,
      nokName,
      nokRelationship,
      nokaddr,
      travelParty,
      groupType,
      currency,
      travelPurpose,
      preMedical,
      medical,
      sumAssured,
      passportNumber,
      premium,
      firstName,
      lastName,
      dateOfBirth,
      pryEmail,
      physicalAddress,
      smsTel,
      productId,
      titleId,
      genderId,
    };

    axios.post('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/PostTravelSchedule', data, {
      headers,
    })
      .then((response) => {
        console.log('Data', response.data);
        const { success, transactionRef } = response.data;
        if (success) {
          conversation.keepTurn(true);
          conversation.variable('transactionRef', transactionRef);
          conversation.transition();
          done();
        } else {
          conversation.keepTurn(true);
          conversation.transition('travelFailure');
          done();
        }
      }).catch((err) => {
        console.log('error', inspect(err.response.data[, options: {showHidden, depth, colors, showProxy, ...moreOptions}]));
        conversation.keepTurn(true);
        conversation.transition('travelError');
        done();
      });
  },
};
