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

exports.sendSmsLoginVerificationCode = async (verificationCode, number) => {
    return true;
}