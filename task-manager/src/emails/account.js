const sgMail = require('@sendgrid/mail')

const apiKey = ''
sgMail.setApiKey(apiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'davidpatrick1000r@gmail.com',
        subject: 'Thanks for joining',
        text: `Thank you for creating an account ${name}` 
    })
}


const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'davidpatrick1000r@gmail.com',
        subject: 'Follow up (why did you delete account)',
        text: `Hi, ${name}, We just wanted to follow up on why you deleted your account with us.
                We would love some feedback on how to better improve our product and how in future we could get you to stay.`

    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

