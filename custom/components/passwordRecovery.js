const EmailService = require('../services/EmailService');

var generator = require('random-number');
let mysql = require('promise-mysql');


module.exports = {
    metadata: () => ({
        name: 'PasswordRecovery',
        properties: {
            SupplierID: {
                required: true,
                type: 'string'
            },
        }
    }),
    invoke: (conversation, done) => {
        let tableCreationQuery = 'CREATE TABLE IF NOT EXISTS `bytenaij_nipex`.`password_recovery` ( `transID` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(255) NOT NULL , `code` INT(6) NOT NULL , PRIMARY KEY (`transID`)) ENGINE = MyISAM';
        let mysqlConnectionString = 'mysql://bytenaij_nipex:nipex1234567890@5.153.10.230:3306/bytenaij_nipex';
        let connection;
        mysql.createConnection({
            host: '5.153.10.230',
            password: 'nipex1234567890',
            user: 'bytenaij_nipex',
            port: 3306,
            database: 'bytenaij_nipex'
        }).then(conn =>{
            connection = conn;
            return connection.query('select `*` from suppliers where `supplierID`="' + SupplierID + '"')
            conn.end()
        }).then(row =>{
            console.log(row);
            connection.end()
        })

        let {
            SupplierID
        } = conversation.properties();

         
        var password = generator({
            min:  1000,
            max:  999999,
            integer: true
          });

        EmailService.email(email, password)
        conversation.keepTurn(true);
        conversation.transition('lifePolicyRenewalFailure')
        done()

    }
};