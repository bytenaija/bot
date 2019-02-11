
const generator = require('generate-password');
const mysql = require('promise-mysql');
const Promise = require('bluebird');
const EmailService = require('../services/EmailService');

module.exports = {
  metadata: () => ({
    name: 'CodeEntry',
    properties: {
      code: {
        required: true,
        type: 'string',
      },
    },
    supportedActions: ['codeEntryError'],
  }),
  invoke: (conversation, done) => {
    const {
      code,
    } = conversation.properties();

    let connection; let connection2; let
      SystemType;

    Promise.all([

      mysql.createConnection({
        host: 'test.nipexjqs.com',
        password: 'softalliance',
        user: 'softalliance',
        port: 3306,
        database: 'softalliance',
      }).then((conn) => {
        connection = conn;
        return connection.query(`select * from password_recovery where \`code\`="${code}"`);
      }).then((row) => {
        connection.end();
        if (row.length != 0) {
          return row[0].SystemType;
        }
        return false;
      }).catch((e) => {
        if (connection) connection.end();
        return false;
      }),


      mysql.createConnection({
        host: '80.241.219.166',
        password: 'N1p2e3x4#',
        user: 'nipex_staging',
        port: 3306,
        database: 'db_nipex_dnb',
      }).then((conn) => {
        connection2 = conn;
        return connection2.query(`select * from password_recovery where \`code\`="${code}"`);
      }).then((row) => {
        connection2.end();
        if (row.length != 0) {
          return row[0].SystemType;
        }
        return false;
      }).catch((e) => {
        // console.log("THIS ERRORORORORORORORRO:",e);
        if (connection2) connection2.end();

        return false;
      }),


    ]).spread((NJQS, VRS) => {
      console.log(NJQS, VRS);
      if (NJQS) {
        SystemType = NJQS;
      } else if (VRS) {
        SystemType = NJQS;
      }

      console.log('System Type', SystemType);
      if (SystemType == 'National Joint Qualification System (NJQS) (Qualification system)') {
        mysql.createConnection({
          host: 'test.nipexjqs.com',
          password: 'softalliance',
          user: 'softalliance',
          port: 3306,
          database: 'softalliance',
        }).then((conn) => {
          connection = conn;
          return connection.query(`select * from password_recovery where \`code\`="${code}"`);
        }).then((row) => {
          if (row.length != 0) {
            const {
              email,
            } = row[0];

            const password = generator.generate({
              length: 15,
              numbers: true,
              uppercase: true,
              excludeSimilarCharacters: true,
            });
            connection.query(`DELETE FROM \`password_recovery\` WHERE \`code\` = "${code}"`).then((result) => {
              connection.query(`UPDATE \`sec_supp_users\` SET \`pswd\` = '${password}' WHERE \`sec_supp_users\`.\`email\` = '${email}'`).then(result => connection.query(`select * from sec_supp_users where \`email\`="${email}"`)).then((row) => {
                if (row.length != 0) {
                  const {
                    email,
                    name,
                  } = row[0];
                  connection.end();
                  EmailService.email(email, password, name, 'PasswordRecovery');
                  conversation.keepTurn(true);
                  conversation.transition();
                  done();
                } else {
                  connection.end();
                  conversation.transition('codeEntryError');
                }
              }).catch((err) => {
                connection.end();
                console.log(err);
                conversation.transition('codeEntryError');
                done();
              });
            });
          } else {
            connection.end();
            conversation.transition('codeEntryError');
            done();
          }
        }).catch((err) => {
          console.log(err);

          connection.end();
        });
      } else if (SystemType == 'Vendor Registration (Pre-Qualification) system (VRS)') {
        mysql.createConnection({
          host: '80.241.219.166',
          password: 'N1p2e3x4#',
          user: 'nipex_staging',
          port: 3306,
          database: 'db_nipex_dnb',
        }).then((conn) => {
          connection = conn;
          return connection.query(`select * from password_recovery where \`code\`="${code}"`);
        }).then((row) => {
          if (row.length != 0) {
            const {
              email,
              QuestionnaireType,
            } = row[0];

            const password = generator.generate({
              length: 15,
              numbers: true,
              uppercase: true,
              excludeSimilarCharacters: true,
            });
            connection.query(`DELETE FROM \`password_recovery\` WHERE \`code\` = "${code}"`).then((result) => {
              if (QuestionnaireType == 'Pre-Questionnaire') {
                connection.query(`UPDATE \`tbl_company_mst\` SET \`fldv_company_password\` = '${password}' WHERE \`tbl_company_mst\`.\`fldv_email_id\` = '${email}'`).then(result => connection.query(`select * from tbl_company_mst where \`fldv_email_id\`="${email}"`)).then((row) => {
                  if (row.length != 0) {
                    const {
                      email,

                    } = row[0];
                    connection.end();
                    EmailService.email(email, password, '', 'PasswordRecovery');
                    conversation.keepTurn(true);
                    conversation.transition();
                    done();
                  } else {
                    connection.end();
                    conversation.transition('codeEntryError');
                  }
                }).catch((err) => {
                  connection.end();
                  console.log(err);
                  conversation.transition('codeEntryError');
                  done();
                });
              } else {
                connection.query(`UPDATE \`tbl_vendor_mst\` SET \`fldv_password\` = '${password}' WHERE \`tbl_vendor_mst\`.\`fldv_issued_ID\` = '${email}'`).then(result => connection.query(`select * from tbl_vendor_mst where \`email\`="${email}"`)).then((row) => {
                  if (row.length != 0) {
                    const {
                      email,

                    } = row[0];
                    connection.end();
                    EmailService.email(email, password, '', 'PasswordRecovery');
                    conversation.keepTurn(true);
                    conversation.transition();
                    done();
                  } else {
                    connection.end();
                    conversation.transition('codeEntryError');
                  }
                }).catch((err) => {
                  connection.end();
                  console.log(err);
                  conversation.transition('codeEntryError');
                  done();
                });
              }
            });
          } else {
            connection.end();
            conversation.transition('codeEntryError');
            done();
          }
        }).catch((err) => {
          console.log(err);

          connection.end();
        });
      }
    });
  },
};
