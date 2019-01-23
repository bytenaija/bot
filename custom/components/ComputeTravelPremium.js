const axios = require('axios');

module.exports = {
    metadata: () => ({
        name: 'ComputeTravelPremium',
        properties: {
            
        },
        supportedActions: ['travelInsuranceNotDefined']
    }),
    invoke: (conversation, done) => {

       
        const headers = {
            "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
            "Content-Type": "application/json"
        }

        axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

        let colorList = []

        axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/ComputeTravelPremium`, {
                headers: headers,
            })
            .then(response => {
                console.log("Data", response.data)

                if (response.data.success) {
                    let {
                        result
                    } = response.data
                    
               

                conversation.variable("colorList", colorList);
                conversation.variable("yrManf", yrManf);
                conversation.keepTurn(true)
                conversation.transition()
                done()
       
                  
                } else {
                    let msg = response.data.error.message
                    conversation.reply(msg)
                    .transition('travelInsuranceNotDefined')
                    done()
                }
            }).catch(err => {
                console.log("error", err);
                let msg = err.error.message
                    conversation.reply(msg)
                    .transition('travelInsuranceNotDefined')
                conversation.keepTurn(true);
                conversation.transition('travelInsuranceNotDefined')
                done()
            })
    }
};