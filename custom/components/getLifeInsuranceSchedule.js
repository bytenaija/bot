
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'getLifePolicyRenewalSchedule',
    properties: {
      policyNo: {
        required: true,
        type: 'string'
      },
     
      amount: {
        required: true,
        type: 'int'
      },

      phone: {
        required: true,
        type: 'string'
      },

      transactionDate: {
        required: false,
        type: 'string'
      },

      policyStatus: {
        required: true,
        type: 'string'
      },

      customerName: {
        required: true,
        type: 'string'
      },

      email: {
        required: true,
        type: 'string'
      },
    },
    supportedActions: ['getLifePolicyRenewalScheduleSuccess', 'getLifePolicyRenewalScheduleFailure', 'getLifePolicyRenewalScheduleError']
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();
    const {policyNo} = conversation.properties()

    console.log("policy Number", policyNo)
    const headers = {
      "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      "Content-Type": "application/json"
    }
    
let {customerName, transactionDate, policyNo, email, phone, amount, policyStatus} = conversation.properties();

    let data = 
        {
            customerName,
            transactionDate,
            policyNo,
            email,
            phone,
            amount,
            policyStatus
        }
    
    axios.post(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetLifePolicyRenewalDetails?policyno=${policyNo}`, {
        headers: headers,
        data
      })
      .then(response => {
        console.log(response.data)
        // Handle the charge response
        if (response.data.success) {
            let {result} = response.data;
          conversation.keepTurn(true)
          conversation.variable("transactionRef", result.transactionref)
          conversation.transition('getLifePolicyRenewalScheduleSuccess')
          done()
        }else{
            conversation.keepTurn(true);
            conversation.transition('getLifePolicyRenewalScheduleFailure')
            done()
        }
      }).catch(err =>{
          console.log(err);
          conversation.keepTurn(true);
            conversation.transition('getLifePolicyRenewalScheduleError')
            done()
      })
  }
};