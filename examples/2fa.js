const lib = require('..');

/* Basic Auth */
lib.Configuration.basicAuthUserName = "YOUR_BASIC_API_KEY";
lib.Configuration.basicAuthPassword = "YOUR_BASIC_SECRET_KEY";

/* HMAC
lib.Configuration.hmacAuthUserName = "YOUR_HMAC_API_KEY";
lib.Configuration.hmacAuthPassword = "YOUR_HMAC_SECRET_KEY";
*/

var controller = lib.TwoFactorController;

let body = new lib.SendMessagesRequest();

body.messages = [];
body.messages[0] = new lib.Message();
body.messages[0].content = 'Your verification code is 123456';
body.messages[0].destinationNumber = '+61491570156';

controller.sendMessages(body, function(error, response, context) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});
