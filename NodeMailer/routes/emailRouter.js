var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./../cors');
const emailRouter = express.Router();
var nodeMailer = require('nodeMailer');
emailRouter.route('/')
    .options(cors.cors, (req, res) => {
        console.log("Coming email here");
        res.sendStatus(200);
    })
    .post(cors.cors, (req, res, next) => {
        var transporter = nodeMailer.createTransport({
            // service: 'gmail',
            host: 't.pl',
            port: 465,
            secure: true,
            auth: {
                user: 'puchrowicz_portfolio@t.pl',   //mail z którego będą wysyłane wiadomości
                pass: 'Qwerty123!'                   //hasło do maila
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from:  req.body.name + " <" + req.body.email + ">",
            to: 'puchrowicz_portfolio@t.pl',
            subject: 'PORTFOLIO | Nowa wiadomość',
            html:   "<p>Nowa wiadomość od: <b>"+req.body.name+"</b><br>"+
                    "email: "+req.body.email+
                    "</p><hr><br><p>"+req.body.message+"</p>"
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Error (tranporter.emailRouter.js): "+error);
                res.send('Error (tranporter.emailRouter.js)');
            } else {
                console.log('Email sent (emailRouter.js): '+ info.response);
                res.json({ message: 'Email sent successfully' });
            }
        });
    })

    module.exports = emailRouter;