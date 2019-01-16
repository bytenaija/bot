const axios = require('axios');
const Promise = require('bluebird');

module.exports = {
    metadata: () => ({
        name: 'getPostCarInsuranceForm',
        properties: {
            email: {
                type: 'string',
                required: true
            },
            phoneNumber: {
                type: 'string',
                required: true 
            }, 
            
            plateNumber : {
                type: 'string',
                required: true
            },
            makeYear:{
                type: 'string',
                required: true
            },

            bodyType:   {
                type: 'string',
                required: true
            },
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
                    let colorList = []
                    for(let idx in result ){
                    
                        colorList.push({"label": result[idx], "value": result[idx]})
                    }
                    return colorList;
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

                    let yrManf = []
                    for(let idx in result ){
                    
                        yrManf.push({"label": result[idx], "value": result[idx]})
                    }

                    return yrManf;
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

                    let genders = []
                    for(let idx in result ){
                      
                        genders.push({"label": result[idx].name, "value": result[idx].id})
                    }
                    return genders;
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

                    console.log(result)
                    let titles = []
                    for(let idx in result ){
                      
                        titles.push({"label": result[idx].name, "value": result[idx].id})
                    }
                    return titles;
                    
                }
            }),

            axios.get(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/GetBodyTypes`, {
                headers: headers,
            })
            .then(response => {
              
            
                if (response.data.success) {
                    let {
                        result
                    } = response.data

                    let bodyTypes = []
                    for(let idx in result ){
                    
                        bodyTypes.push({"label": result[idx], "value": result[idx]})
                    }
                    return bodyTypes;
                }
            }),


            // 
        ]).spread((selectedInsurance, colorList, yrManf, genders, titles, bodyTypes) => {

            conversation.variable("filteredInsurance", selectedInsurance);
            conversation.variable("colorList", colorList);
            conversation.variable("yrManf", yrManf);
            conversation.variable("titles", titles);
            conversation.variable("genders", genders);
            conversation.variable("bodyTypes", bodyTypes);
            conversation.keepTurn(true)
            conversation.transition()
            done()
        })

    }
};