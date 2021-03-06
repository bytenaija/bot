
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'getLifePolicyRenewalDetails',
    properties: {
      policyNo: {
        required: false,
        type: 'string',
      },

    },
    supportedActions: ['lifePolicyRenewalSuccess', 'lifePolicyRenewalFailure', 'lifePolicyRenewalError'],
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();
    const { policyNo } = conversation.properties();

    console.log('policy Number', policyNo);
    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      'Content-Type': 'application/json',
    };


    axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetLifePolicyRenewalDetails?policyno=${policyNo}`, {
      headers,
    })
      .then((response) => {
        console.log(response.data);
        // Handle the charge response
        if (response.data.result.isSuccessful) {
          const { result } = response.data;
          conversation.keepTurn(true);
          conversation.variable('amount', result.nextInstallmentPremium);
          conversation.variable('phone', result.phone);
          conversation.variable('policyStatus', result.policyStatus);
          conversation.variable('customerName', result.clientName);
          conversation.variable('email', result.email);
          conversation.transition('getPolicyRenewalSuccess');
          done();
        } else {
          conversation.keepTurn(true);
          conversation.transition('getPolicyRenewalFailure');
          done();
        }
      }).catch((err) => {
        console.log('error in renewal details', err);
        conversation.keepTurn(true);
        conversation.transition('getPolicyRenewalError');
        done();
      });
  },
};
