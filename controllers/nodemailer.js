const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user : "pieceofcake23@outlook.com",
        pass : "shubham@pieceofcake123"
    }
})


module.exports = transporter;