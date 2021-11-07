const Contact = require("../models/contact.model");
const nodemailer = require('nodemailer');

module.exports = {
    async submit(req, res) {
        await Contact.create(req.body)
            .then((contact) => res.json(contact))
            .catch((err) => res.status(400).json(err))

        // Instantiate the SMTP server
        const smtpTrans = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        // Specify what the email will look like
        const mailOpts = {
            from: 'Your sender info here', // This is ignored by Gmail
            to: process.env.GMAIL_USER,
            subject: 'New message from contact form at FindSugarAPI',
            text: `${req.body.fullName} (${req.body.email}) says: ${req.body.message}`
        }

        // Attempt to send the email
        await smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log("fail message not sent to email") // Show a page indicating failure
            }
            else {
                console.log("success message sent to findsugarapi@gmail.com") // Show a page indicating success
            }
        })
    },
    getAll(req, res) {
        Contact.find()
            .then((contacts) => res.json(contacts))
            .catch((err) => res.json(err));
    }
}