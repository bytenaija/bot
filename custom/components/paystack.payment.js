'use strict';

const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'paystack.payment',
    properties: {
      cardDetails: {
        required: false,
        type: 'string'
      },
      // otp: { required: false, type: 'string' },
      // pin: { required: false, type: 'string' },
      email: {
        required: false,
        type: 'string'
      },
      amount: {
        required: false,
        type: 'string'
      },
    },
    supportedActions: ['authenticateWithOTP', 'authenticateWithPIN', 'success']
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();




    const transaction = {
      email: "some@body.nice",
      amount: "10000",
      reference: "kxjjhhfd85955",
      card: {
        number: "4084084084084081",
        cvv: "408",
        expiry_month: "09",
        expiry_year: "21"
      }
    }

    

    axios({
      method: 'post',
      url: 'https://api.paystack.co/charge',
      data: transaction,
      config: { headers: {
        "Authorization": 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd',
        "Content-Type": "application/json"
      }}
      })
      .then(chargeResponse => {
        console.log(chargeResponse)
        // Handle the charge response
        if (chargeResponse.status === 'success') {
          conversation.keepTurn(true)
          conversation.transition('success')
        }
      }).catch(err => console.log("Errorroooooooooooo", err))

    done();
  }
};

