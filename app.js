const axios = require('axios');
const generator = require('generate-password');
const EmailService = require('./custom/services/EmailService');

const password = generator.generate({
  length: 15,
  numbers: true,
  uppercase: true,
  symbols: true,
  excludeSimilarCharacters: true,
});

// EmailService.email("everistusolumese@gmail.com", password)
axios.defaults.headers.post.Authorization = 'Bearer sk_test_dce12f10f109e0a79d04e8f1615610e9d89c240e';

const headers = {
  Authorization: 'Bearer sk_test_dce12f10f109e0a79d04e8f1615610e9d89c240e',
  'Content-Type': 'application/json',
};
const card = {
  number: '408 408 408 408 408 1',
  cvv: '408',
  expiry_month: '10',
  expiry_year: '21',
};

const transaction = {
  email: 'everistusolumese@gmail.com',
  amount: 250000 * 100,
  reference: `TRS-Goat-Payment-${Date.now()}`,
  card,
};


axios.post('https://api.paystack.co/charge',
  transaction)
  .then((chargeResponse) => {
    console.log(chargeResponse.data);
    // Handle the charge response
    if (chargeResponse.data.status) {

    }
  }).catch(err => console.log(err));
