
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'postPartnerPayment',
    properties: {
      policyNo: {
        required: true,
        type: 'string'
      },
     
      amountPaid: {
        required: true,
        type: 'int'
      },

      transactionRef: {
        required: true,
        type: 'string'
      },

      paymentRef: {
        required: false,
        type: 'string'
      },

    },
    supportedActions: ['lifePolicyRenewalSuccess', 'lifePolicyRenewalFailure', 'lifePolicyRenewalError']
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();
    
    const headers = {
      "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      "Content-Type": "application/json"
    }
    
    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

let {transactionRef, policyNo, amountPaid, paymentRef} = conversation.properties();

    let data = 
        {
            transactionRef, 
            policyNo, 
            amountPaid, 
            paymentRef
        }
    
    axios.post(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/FinalizePartnerPayment`, data, {
        headers: headers,
      })
      .then(response => {
        console.log("Data", response.data)
        
        if (response.data.success) {
          conversation.keepTurn(true)
          conversation.transition()
          done()
        }else{
            conversation.keepTurn(true);
            conversation.transition('lifePolicyRenewalFailure')
            done()
        }
      }).catch(err =>{
          console.log("error",err);
          conversation.keepTurn(true);
            conversation.transition('lifePolicyRenewalError')
            done()
      })
  }
};