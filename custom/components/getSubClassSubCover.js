const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'getProductSubClassCover',
    properties: {
      productId: {
        required: false,
        type: 'string',
      },

    },
    supportedActions: ['getInsuranceProductsSuccess', 'getInsuranceProductsEmpty', 'getInsuranceProductsError'],
  }),
  invoke: (conversation, done) => {
    const {
      productId,
    } = conversation.properties();
    const headers = {
      'X-ApiKey': 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      'Content-Type': 'application/json',
    };

    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';


    axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetProductSubClassCoverTypes?productId=${productId}`, {
      headers,
    })
      .then((response) => {
        console.log('Data', response.data);

        if (response.data.success) {
          const {
            result,
          } = response.data;
          const filteredResult = [];
          for (res of result) {
            let description = '';
            for (benefit of res.benefits) {
              description += `${benefit.name} : ${benefit.description}\r \n`;
            }
            filteredResult.push({
              id: res.subClassCoverTypes.id,
              name: res.subClassCoverTypes.coverTypeName,
              description,
            });
          }
          console.log(filteredResult);
          conversation.variable('subClassCover', filteredResult);
          conversation.keepTurn(true);
          conversation.transition();
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
