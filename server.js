const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: '',
        pass: '',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    const mailData = {
        from: "",
        to: to,
        subject: "You have to pay!!",
        html: ` <p>
                    Hey ${name},
                </p>
                <p>
                    This is just a little reminder that - ${amount} is due on - ${date}
                </p>
                <p>
                    Please make the payment before the due date !
                </p>
                <p>
                    Thank you.
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Invitation sent!", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);
