
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'paystack.payment',
    properties: {
      cardDetails: {
        required: true,
        type: 'string'
      },
      // otp: { required: false, type: 'string' },
      // pin: { required: false, type: 'string' },
      email: {
        required: true,
        type: 'string'
      },
      amount: {
        required: true,
        type: 'string'
      },

      transactionRef: {
        required: true,
        type: 'string'
      },
    },
    supportedActions: ['authenticateWithOTP', 'authenticateWithPIN', 'paymentSuccess', 'paymentFailure', 'paymentError']
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
   const { cardDetails, email, amount, transactionRef } = conversation.properties();
   console.log(email)

   axios.defaults.headers.post['Authorization'] = 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd';

   console.log(cardDetails)
  let expiry = cardDetails.expiry.split("/");

    const headers = {
      "Authorization": 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd',
      "Content-Type": "application/json"
    }
    const card = {
      number: cardDetails.cardNumber,
      cvv: cardDetails.cvv,
      expiry_month: expiry[0],
      expiry_year: expiry[1]
    }

    const transaction = {
      email: email,
      amount: amount * 100,
      reference: transactionRef,
      card
    }


    axios.post(`https://api.paystack.co/charge`, 
        transaction
      )
      .then(chargeResponse => {
        console.log(chargeResponse.data)
        // Handle the charge response
        if (chargeResponse.data.status) {
          conversation.keepTurn(true)
          conversation.variable("paymentRef", chargeResponse.data.data.id)
          conversation.transition('paymentSuccess')
          done()
        }else{
          conversation.keepTurn(true)
          conversation.transition('paymentFailure')
          done()
        }
      }).catch(err =>{
        console.log(err)
        conversation.keepTurn(true)
        conversation.transition('paymentError')
        done()
      })
  }
};