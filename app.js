const EmailService = require('./custom/services/EmailService');
var generator = require('generate-password');
 
var password = generator.generate({
    length: 15,
    numbers: true,
    uppercase: true,
    symbols: true,
    excludeSimilarCharacters:true
});

EmailService.email("everistusolumese@gmail.com", password)