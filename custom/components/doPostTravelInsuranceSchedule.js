
const axios = require('axios');

module.exports = {
  metadata: () => ({
    name: 'postTravelInsuranceSchedule',
    properties: {
      name: {
        required: true,
        type: String
      },
      countryId: {
        required: true,
        type: String
      },
      wef: {
        required: true,
        type: String
      },
      wet: {
        required: true,
        type: String
      },
      nokName: {
        required: true,
        type: String
      },
      nokRelationship: {
        required: true,
        type: String
      },
      nokaddr: {
        required: true,
        type: String
      },
      travelParty: {
        required: true,
        type: String
      },
      groupType: {
        required: true,
        type: String
      },
      currency: {
        required: true,
        type: String
      },
      travelPurpose: {
        required: true,
        type: String
      },
      preMedical: {
        required: true,
        type: String
      },
      preMedical: {
        required: true,
        type: String
      },
      sumAssured: {
        required: true,
        type: String
      },
      passportNumber: {
        required: true,
        type: String
      },
      premium: {
        required: true,
        type: String
      },
      firstName: {
        required: true,
        type: String
      },
      lastName: {
        required: true,
        type: String
      },
      dateOfBirth: {
        required: true,
        type: String
      },
      pryEmail: {
        required: true,
        type: String
      },
      physicalAddress: {
        required: true,
        type: String
      },
      smsTel: {
        required: true,
        type: String
      },
      productId: {
        required: true,
        type: String
      },
      titleId: {
        required: true,
        type: String
      },
      genderId: {
        required: true,
        type: String
      },

  
    },
    supportedActions: ['travelFailure', 'travelError']
  }),
  invoke: (conversation, done) => {
    //     // perform conversation tasks.
    //     const { cardDetails, otp, pin, email, amount } = conversation.properties();
    
    const headers = {
      "X-ApiKey": 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/',
      "Content-Type": "application/json"
    }
    
    axios.defaults.headers.post['X-ApiKey'] = 'Pr4d++7WTRIzkzZHunc4+dyh6wWDmUBrj57AIhUXY6dG7TeZPFwwIvBW+ZBo8oK/';

let {

  name,
  countryId,
  wef,
  wet,
  nokName,
  nokRelationship,
  nokaddr,
  travelParty,
  groupType,
  currency,
  travelPurpose,
  preMedical,
  preMedical,
  sumAssured,
  passportNumber,
  premium,
  firstName,
  lastName,
  dateOfBirth,
  pryEmail,
  physicalAddress,
  smsTel,
  productId,
  titleId,
  genderId,

} = conversation.properties();

    let data = 
        {
          name,
          countryId,
          wef,
          wet,
          nokName,
          nokRelationship,
          nokaddr,
          travelParty,
          groupType,
          currency,
          travelPurpose,
          preMedical,
          preMedical,
          sumAssured,
          passportNumber,
          premium,
          firstName,
          lastName,
          dateOfBirth,
          pryEmail,
          physicalAddress,
          smsTel,
          productId,
          titleId,
          genderId,
        }
    
    axios.post(`https://e-business.aiicoplc.com:89/api/services/app/BuyProduct/PostTravelSchedule`, data, {
        headers: headers,
      })
      .then(response => {
        console.log("Data", response.data)
        let {success, transactionRef} = response.data
        if (success) {
          conversation.keepTurn(true)
          conversation.variable('transactionRef', transactionRef)
          conversation.transition()
          done()
        }else{
            conversation.keepTurn(true);
            conversation.transition('travelFailure')
            done()
        }
      }).catch(err =>{
          console.log("error",err);
          conversation.keepTurn(true);
            conversation.transition('travelError')
            done()
      })
  }
};