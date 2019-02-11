
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'getLifePolicyRenewalSchedule',
    properties: {
      policyNo: {
        required: true,
        type: 'string',
      },

      amount: {
        required: true,
        type: 'int',
      },

      phone: {
        required: true,
        type: 'string',
      },

      transactionDate: {
        required: false,
        type: 'string',
      },

      policyStatus: {
        required: true,
        type: 'string',
      },

      customerName: {
        required: true,
        type: 'string',
      },

      email: {
        required: true,
        type: 'string',
      },
    },
    supportedActions: ['lifePolicyRenewalSuccess', 'lifePolicyRenewalFailure', 'lifePolicyRenewalError'],
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();

    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      'Content-Type': 'application/json',
    };

    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

    const {
      customerName, transactionDate, policyNo, email, phone, amount, policyStatus,
    } = conversation.properties();

    const data = {
      customerName,
      transactionDate,
      policyNo,
      email,
      phone,
      amount,
      policyStatus,
    };

    axios.post('https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/PostLifeRenewalSchedule', data, {
      headers,
    })
      .then((response) => {
        console.log('Data', response.data);

        if (response.data.success) {
          const { result } = response.data;
          console.log('transaction Ref', result.transactionRef);
          conversation.keepTurn(true);
          conversation.variable('transactionRef', result.transactionRef);
          conversation.transition('lifePolicyRenewalSuccess');
          done();
        } else {
          conversation.keepTurn(true);
          conversation.transition('lifePolicyRenewalFailure');
          done();
        }
      }).catch((err) => {
        console.log('error', err);
        conversation.keepTurn(true);
        conversation.transition('lifePolicyRenewalError');
        done();
      });
  },
};
