const axios = require('axios');

module.exports = {
    metadata: () => ({
        name: 'getColorList',
        properties: {
            
        },
        supportedActions: ['getColorListSuccess', 'getColorListFailure', 'getColorListError']
    }),
    invoke: (conversation, done) => {

       
        const headers = {
            "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
            "Content-Type": "application/json"
        }

        axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';



        axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetColorList`, {
                headers: headers,
            })
            .then(response => {
                console.log("Data", response.data)

                if (response.data.success) {
                    let {
                        result
                    } = response.data
                    
                    conversation.variable("colorList", result);
                    conversation.keepTurn(true)
                    conversation.transition()
                    done()
                } else {
                    conversation.keepTurn(true);
                    conversation.transition('getColorListFailure')
                    done()
                }
            }).catch(err => {
                console.log("error", err);
                conversation.keepTurn(true);
                conversation.transition('getColorListError')
                done()
            })
    }
};