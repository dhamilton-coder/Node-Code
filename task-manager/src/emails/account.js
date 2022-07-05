const sgMail = require('@sendgrid/mail')

const apiKey = ''

sgMail.setApiKey(apiKey)

sgMail.send({
    to: '' ,
    
})
