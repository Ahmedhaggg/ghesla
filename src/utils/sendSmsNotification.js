const { INFOBIP_API_KEY, INFOBIP_API_URL } = require("../config")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.sendSmsLoginVerificationCode = async (verificationCode, to) => {
    return true;
    try {
        const message =  JSON.stringify({
            messages: [
                {
                    destinations: [
                        {
                            to: ` 2${to}`
                        }
                    ],
                    from: "ghesla",
                    text: `verification code: ${verificationCode}`
                }
            ]
        });
        let response = await fetch(`${INFOBIP_API_URL}/sms/2/text/advanced`, {
            method: 'POST',
            body: message,
            headers: {
                'Authorization': `App ${INFOBIP_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        let isOk = response.status;
        let json = await response.json();
        console.log(json)
        // const smsOptions = {
        //     to: number,
        //     text: "رمز التحقق الخاص بك هو" + verificationCode,
        // };
    } catch(error) {
        console.log(error)
        return false;
    }
}


// var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'https://api.sms.to/sms/send',
//   'headers': {
//     'Authorization': 'Bearer <api_key>',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "message": "This is test and \n this is a new line",
//     "to": "+35799999999999",
//     "bypass_optout": true,
//     "sender_id": "SMSto",
//     "callback_url": "https://example.com/callback/handler"
//   })

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });