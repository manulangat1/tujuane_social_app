const nodemailer = require('nodemailer')


const sendemail = async (mail) => {
    const transport = {
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    }
    const transporter = await nodemailer.createTransport(transport)
    await transporter.verify((error,succes) =>{
        if (error){
            console.log(`${err}`)
        } else {
            console.log('Ready to send email')
        }
    })
    const mails = {
        from:process.env.EMAIL,
        to:`${mail.to}`,
        subject:`${mail.subject}`,
        html:`${mail.html}`
    }
    return await transporter.sendMail(mails, (err,data) => {
        if (err){
            console.log(err)
        } else{
            console.log("Send Success".green.bold)
        }
    })
}
module.exports = sendemail