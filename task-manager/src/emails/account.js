const sgMail = require('@sendgrid/mail')

const apiKey = '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'

sgMail.setApiKey(apiKey)

sgMail.send({
    to: '' ,
    
})