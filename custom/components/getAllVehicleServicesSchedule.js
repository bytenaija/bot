
const axios = require('axios');
const Promise = require('bluebird');

module.exports = {
  metadata: () => ({
    name: 'getAllVehicleServicesSchedule',
    properties: {
    },
    supportedActions: []
  }),
  invoke: (conversation, done) => {

    const headers = {
      "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      "Content-Type": "application/json"
    }
    
    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';


    Promise.all([

        axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetProducts`, {
            headers
        })
      .then(response => {
        let selectedInsurance 
        if (response.data.success) {
            let {result} = response.data
            
   
                selectedInsurance = result.filter(insurance => insurance.name == 'Private Motor Comprehensive' ||  insurance.name == 'Private Motor 3rd Party')
          
          

            return selectedInsurance;
            
        }else{
            conversation.keepTurn(true);
            conversation.transition()
            done()
        }
      }).catch(err =>{
          console.log("error",err);
          conversation.keepTurn(true);
            conversation.transition()
            done()
      })

    ]).spread(selectedInsurance =>{
        console.log("SelectedInsurance", selectedInsurance);
        conversation.variable("filteredInsurance", selectedInsurance);
          conversation.keepTurn(true)
          conversation.transition()
          done()
    })
    
  }
};