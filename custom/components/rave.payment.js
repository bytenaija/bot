const axios = require('axios');
const Ravepay = require('ravepay');
const Promise = require('bluebird');
const ip = require('ip');


module.exports = {
  metadata: () => ({
    name: 'rave.payment',
    properties: {
      cardDetails: {
        required: true,
        type: 'string',
      },
      // otp: { required: false, type: 'string' },
      // pin: { required: false, type: 'string' },
      email: {
        required: true,
        type: 'string',
      },
      amount: {
        required: true,
        type: 'string',
      },

      transactionRef: {
        required: true,
        type: 'string',
      },
      currency: {
        required: false,
        type: 'string',
      },
      transition: {
        required: false,
        type: 'string',
      },

      errorTransition: {
        required: false,
        type: 'string',
      },
    },
    supportedActions: ['authenticateWithOTP', 'authenticateWithPIN', 'paymentSuccess', 'paymentFailure', 'paymentError'],
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    const {
      cardDetails,
      email,
      amount,
      transactionRef,
      transition,
      errorTransition,
      currency,
    } = conversation.properties();
    // console.log(email)

    axios.defaults.headers.post.Authorization = 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd';

    // console.log(cardDetails)
    const expiry = cardDetails.expiry.split('/');

    const headers = {
      Authorization: 'Bearer sk_test_f4a095ef53406f3f9488ab67d7f9e67e046ca8dd',
      'Content-Type': 'application/json',
    };
    const card = {
      number: cardDetails.cardNumber,
      cvv: cardDetails.cvv,
      expiry_month: expiry[0],
      expiry_year: expiry[1],
      pin: cardDetails.pin,
    };

    const transaction = {
      email,
      amount: 30000,
      reference: transactionRef,
      card,
    };


    const payload = {
      cardno: card.number,
      cvv: card.cvv,
      expirymonth: card.expiry_month,
      expiryyear: card.expiry_year,
      currency: currency || 'NGN',
      pin: card.pin,
      country: 'NG',
      amount: transaction.amount,
      email: transaction.email,
      // "phonenumber": "1234555",
      suggested_auth: 'PIN',
      firstname: card.firstname,
      lastname: card.lastname,
      IP: ip.address(),
      txRef: transaction.reference,
      // "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    };

    const rave = new Ravepay('FLWPUBK-c674c68d40a0cb428926869498f14171-X', 'FLWSECK-0a7670ba572e2da3c899293b5d96591d-X', false);

    Promise.all([
      rave.Card.charge(payload).then((resp) => {
        let response;
        if (resp.body && resp.body.data && resp.body.data.flwRef) {
          response = resp.body.data.flwRef;
          console.log(resp.body);
        } else {
          response = new Error("Couldn't get response, this is being fixed");
          throw response;
        }
        //   console.log(response)
        return response;
      })
        .catch((err) => {
          console.log('P: ', err);
          conversation.keepTurn(true);
          if (errorTransition) {
            conversation.transition(errorTransition);
          } else {
            conversation.transition('paymentError');
          }

          done();
        }),
    ]).spread((ref) => {
      const payload2 = {
        PBFPubKey: 'FLWPUBK-c674c68d40a0cb428926869498f14171-X',
        transaction_reference: ref,
        otp: '12345',
      };
      rave.Card.validate(payload2).then((resp) => {
        // return resp.body;
        conversation.keepTurn(true);
        conversation.variable('paymentRef', ref);
        if (transition) {
          conversation.transition(transaction);
        } else {
          conversation.transition();
        }

        done();
      })
        .catch((err) => {
          console.log('got this error: ', err.message);
        });
    });
  },
};
