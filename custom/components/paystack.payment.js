'use strict';

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


    const headers = {
      "Authorization": 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd',
      "Content-Type": "application/json"
    }
    const card = {
      number: "4084084084084081",
      cvv: "408",
      expiry_month: "09",
      expiry_year: "21"
    }

    const transaction = {
      email: "some@body.nice",
      amount: "10000",
      reference: "kxjjhhfd85955",
      card
    }

    const axios = require('axios');

    axios({
      method: 'post',
      url: 'https://api.paystack.co/charge',
      data: JSON.stringify(transaction),
      config: { headers: headers}
      })
    // axios.post(`https://api.paystack.co/charge`, {
    //     headers: headers,
    //     data: JSON.stringify(transaction)
    //   })
      .then(chargeResponse => {
        console.log(chargeResponse)
        // Handle the charge response
        if (chargeResponse.status === 'success') {
          conversation.keepTurn(true)
          conversation.transition('success')
        }
      })





    done();
  }
};