const EmailService = require('../services/EmailService');

var generator = require('generate-password');
let mysql = require('promise-mysql');

module.exports = {
    metadata: () => ({
        name: 'CodeEntry',
        properties: {
            code: {
                required: true,
                type: 'string'
            },
        },
        supportedActions: ['codeEntryError']
    }),
    invoke: (conversation, done) => {


        let {
            code
        } = conversation.properties();

        let connection;
        mysql.createConnection({
            host: '5.153.10.230',
            password: 'nipex1234567890',
            user: 'bytenaij_nipex',
            port: 3306,
            database: 'bytenaij_nipex'
        }).then(conn => {
            connection = conn;
            return connection.query('select * from password_recovery where `code`="' + code + '"')

        }).then(row => {
            if (row.length != 0) {
                let {
                    email,
                } = row[0];

                var password = generator.generate({
                    length: 15,
                    numbers: true,
                    uppercase: true,
                    excludeSimilarCharacters: true
                });
                connection.query('DELETE FROM `password_recovery` WHERE `code` = "' + code + '"').then(result => {
                    connection.query("UPDATE `suppliers` SET `password` = '" + password + "' WHERE `suppliers`.`email` = '" + email + "'").then(result => {
                        return connection.query('select * from suppliers where `email`="' + email + '"')

                    }).then(row => {
                        if (row.length != 0) {
                            let {
                                email,
                                name
                            } = row[0];
                            connection.end()
                            EmailService.email(email, password, name, 'PasswordRecovery')
                            conversation.keepTurn(true);
                            conversation.transition()
                            done()
                        } else {
                            connection.end()
                            conversation.transition('codeEntryError')
                        }
                    }).catch(err => {
                        connection.end()
                        console.log(err);
                        conversation.transition('codeEntryError')
                        done()
                    })
                })




            } else {
                connection.end()
                conversation.transition('codeEntryError')
                done()
            }



        }).catch(err => {
            console.log(err);

            connection.end()
        })



    }
};