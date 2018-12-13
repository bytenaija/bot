
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'getAllInsuranceProduct',
    properties: {
     product: {
         required: true,
         type: "string"
     }

    },
    supportedActions: ['getInsuranceProductsSuccess', 'getInsuranceProductsEmpty', 'getInsuranceProductsError']
  }),
  invoke: (conversation, done) => {
//    let {product} = conversation.properties();
    
    const headers = {
      "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      "Content-Type": "application/json"
    }
    
    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';


    
    axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetProducts`, {
        headers: headers,
      })
      .then(response => {
        console.log("Data", response.data)
        let selectedInsurance 
        if (response.data.success) {
            let {result} = response.data
            
   
                selectedInsurance = result.filter(insurance => insurance.name == 'Private Motor Comprehensive' ||  insurance.name == 'Private Motor 3rd Party')
          
            console.log(selectedInsurance)
            conversation.variable("filteredInsurance", selectedInsurance);
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