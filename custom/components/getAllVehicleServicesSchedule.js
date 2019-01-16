const axios = require('axios');
const Promise = require('bluebird');

module.exports = {
    metadata: () => ({
        name: 'getAllVehicleServicesSchedule',
        properties: {},
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
                    let {
                        result
                    } = response.data


                    selectedInsurance = result.filter(insurance => insurance.name == 'Private Motor Comprehensive' || insurance.name == 'Private Motor 3rd Party')



                    return selectedInsurance;

                } else {
                    conversation.keepTurn(true);
                    conversation.transition()
                    done()
                }
            }).catch(err => {
                console.log("error", err);
                conversation.keepTurn(true);
                conversation.transition()
                done()
            }),

            axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetColorList`, {
                headers: headers,
            })
            .then(response => {


                if (response.data.success) {
                    let {
                        result
                    } = response.data
                    return colorList = result;
                } else {
                    conversation.keepTurn(true);
                    conversation.transition('getColorListFailure')
                    done()
                }

            }),

            axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetManufactureYear`, {
                headers: headers,
            })
            .then(response => {
            
                if (response.data.success) {
                    let {
                        result
                    } = response.data

                    return yrManf = result;
                }
            }),

            axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetGenders`, {
                headers: headers,
            })
            .then(response => {
              
                
                if (response.data.success) {
                    let {
                        result
                    } = response.data

                    return genders = result;
                }
            }),

            axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetTitles`, {
                headers: headers,
            })
            .then(response => {
              
            
                if (response.data.success) {
                    let {
                        result
                    } = response.data

                    return titles = result;
                }
            }),

            // 
        ]).spread((selectedInsurance, colorList, yrManf, genders, titles) => {
            // console.log("SelectedInsurance", selectedInsurance);
            // console.log("Colorlist", colorList);

            // console.log("Year Man", yrManf);
            console.log("titles", titles);
            conversation.variable("filteredInsurance", selectedInsurance);
            conversation.variable("colorList", colorList);
            conversation.variable("yrManf", yrManf);
            conversation.variable("titles", titles);
            conversation.variable("genders", genders);
            conversation.keepTurn(true)
            conversation.transition()
            done()
        })

    }
};