import nodemailer from 'nodemailer';
import User from "@/models/userModel"
import bcryptjs from 'bcrypt'


export const sendEmail = async ({ email, emailType, userId }
    : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                },
                {
                    new: true
                }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordExpiry: Date.now() + 3600000,
                },
                {
                    new: true
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
                //TODO : add these credentials to .env file 
            }
        });
        const mailOptions = {
            from: 'utkarshgamer294@outlook.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpass"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}

            or copy -paste link below:- </br>
            ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpass"}?token=${hashedToken}
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        console.log(mailresponse)
    }
    catch (error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}