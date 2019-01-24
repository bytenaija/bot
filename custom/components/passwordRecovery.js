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
            SystemType: {
                required: true,
                type: 'string'
            }
        },
        supportedActions: ['WrongID', 'PasswordRecoveryError']
    }),
    invoke: (conversation, done) => {
        let tableCreationQuery = 'CREATE TABLE IF NOT EXISTS `password_recovery` ( `transID` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(255) NOT NULL , `SystemType` VARCHAR(255) NOT NULL , `code` INT(6) NOT NULL , PRIMARY KEY (`transID`)) ENGINE = MyISAM';
      

        let {
            SupplierID,
            SystemType
        } = conversation.properties();

        console.log("Supplier ID", SupplierID)
        console.log("SystemType", SystemType)
         if(SystemType == 'National Joint Qualification System (NJQS) (Qualification system)'){
        let connection;
        mysql.createConnection({
            host: 'test.nipexjqs.com',
            password: 'softalliance',
            user: 'softalliance',
            port: 3306,
            database: 'softalliance'
        }).then(conn => {
            connection = conn;
           
                return connection.query('select * from sec_supp_users where `login`="' + SupplierID + '"')
           
            
            
        }).then(row => {
            if (row.length != 0) {
                let {
                    email,
                    name
                } = row[0];

              
                connection.query(tableCreationQuery).then(result => {
                    var password = generator({
                        min: 1000,
                        max: 999999,
                        integer: true
                    });
                    connection.query('DELETE FROM `password_recovery` WHERE `email` = "' + email + '"').then(result =>{
                        connection.query("INSERT INTO `password_recovery` (`transID`, `email`, `SystemType`, `code`) VALUES (NULL, '" + email + "', '" + SystemType + "', '" + password + "')").then(result => {
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
            conversation.transition('PasswordRecoveryError');
            done();
            connection.end()
        })

     }else if(SystemType == 'Vendor Registration (Pre-Qualification) system (VRS)'){
            // 80.241.219.166
            // db db_nipex_dnb
            // user nipex_staging
            //  pass N1p2e3x4#
            // fldv_email_id
            // fldv_company_password

            let connection;
        mysql.createConnection({
            host: '80.241.219.166',
            password: 'N1p2e3x4#',
            user: 'nipex_staging',
            port: 3306,
            database: 'db_nipex_dnb'
        }).then(conn => {
            connection = conn;
           
                return connection.query('select * from tbl_vendor_mst where `fldv_issue_ID`="' + SupplierID + '"')
           
            
            
        }).then(row => {
            if (row.length != 0) {
                let {
                    fldv_email,
                } = row[0];

              
                connection.query(tableCreationQuery).then(result => {
                    var password = generator({
                        min: 1000,
                        max: 999999,
                        integer: true
                    });
                    connection.query('DELETE FROM `password_recovery` WHERE `email` = "' + email + '"').then(result =>{
                        connection.query("INSERT INTO `password_recovery` (`transID`, `email`, `SystemType`, `code`) VALUES (NULL, '" + email + "', '" + SystemType + "', '" + password + "')").then(result => {
                            connection.end()
                            EmailService.email(email, password, '', 'CodeGeneration')
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
            conversation.transition('PasswordRecoveryError');
            done();
            connection.end()
        })
               
            }

    }
};