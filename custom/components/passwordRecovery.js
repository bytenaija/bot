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
        },
        supportedActions: ['WrongID', 'PasswordRecoveryError']
    }),
    invoke: (conversation, done) => {
        let tableCreationQuery = 'CREATE TABLE IF NOT EXISTS `bytenaij_nipex`.`password_recovery` ( `transID` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(255) NOT NULL , `code` INT(6) NOT NULL , PRIMARY KEY (`transID`)) ENGINE = MyISAM';
      

        let {
            SupplierID
        } = conversation.properties();

        console.log("Supplier ID", SupplierID)
        let connection;
        mysql.createConnection({
            host: '5.153.10.230',
            password: 'nipex1234567890',
            user: 'bytenaij_nipex',
            port: 3306,
            database: 'bytenaij_nipex'
        }).then(conn => {
            connection = conn;
            return connection.query('select * from suppliers where `supplierID`="' + SupplierID + '"')
            
        }).then(row => {
            if (row.length != 0) {
                let {
                    email,
                    name,
                    supplierID
                } = row[0];

              
                connection.query(tableCreationQuery).then(result => {
                    var password = generator({
                        min: 1000,
                        max: 999999,
                        integer: true
                    });
                    connection.query('DELETE FROM `password_recovery` WHERE `email` = "' + email + '"').then(result =>{
                        connection.query("INSERT INTO `password_recovery` (`transID`, `email`, `code`) VALUES (NULL, '" + email + "', '" + password + "')").then(result => {
                            connection.end()
                            EmailService.email(email, password, name, 'CodeGeneration')
                            conversation.keepTurn(true);
                            conversation.transition()
                            done()
                        }).catch(err =>{
                            connection.end()
                            console.log(err);
                            conversation.transition('PasswordRecoveryError')
                            done()
                        })
                    })
                    
                }).catch(err =>{
                    connection.end()
                    console.log(err);
                    conversation.transition('PasswordRecoveryError');
                    done();
                });


            } else {
                connection.end()
                conversation.transition('WrongID')
                done()
            }

         
            
        }).catch(err =>{
            console.log(err);

            connection.end()
        })



    }
};