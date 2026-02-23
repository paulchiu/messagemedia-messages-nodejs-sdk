# MessageMedia Messages NodeJS SDK Patched Fork

> [!IMPORTANT]
> The original MessageMedia SDK is no longer maintained upstream.

This repository is a fork of `messagemedia/messages-nodejs-sdk` ([GitHub](https://github.com/messagemedia/messages-nodejs-sdk)).
This fork exists to keep dependency and security fixes up to date.

If you are building a new integration, direct REST API usage is still the recommended path:
[MessageMedia Messaging REST API Docs](https://messagemedia.github.io/documentation/#tag/Messages).

## Installation

Install from npm:

```bash
npm install @paulchiu/messagemedia-messages-sdk
```

Or add it to `package.json`:

```json
"@paulchiu/messagemedia-messages-sdk": "^2.0.3"
```

## Usage

Authentication uses API keys from the MessageMedia developer portal.
Basic Auth uses:

- `basicAuthUserName` for API key
- `basicAuthPassword` for API secret

HMAC Auth uses:

- `hmacAuthUserName` for API key
- `hmacAuthPassword` for API secret

### Send an SMS (Basic Auth)

```js
const lib = require('@paulchiu/messagemedia-messages-sdk');

lib.Configuration.basicAuthUserName = 'YOUR_BASIC_API_KEY';
lib.Configuration.basicAuthPassword = 'YOUR_BASIC_SECRET_KEY';

var controller = lib.MessagesController;
let body = new lib.SendMessagesRequest();

body.messages = [];
body.messages[0] = new lib.Message();
body.messages[0].content = 'Hello world!';
body.messages[0].destinationNumber = '+61491570156'; // E.164 format

controller.sendMessages(body, function(error, response, context) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});
```

### HMAC configuration

```js
const lib = require('@paulchiu/messagemedia-messages-sdk');

lib.Configuration.hmacAuthUserName = 'YOUR_HMAC_API_KEY';
lib.Configuration.hmacAuthPassword = 'YOUR_HMAC_SECRET_KEY';
```

## Examples

Example scripts are in `/examples`:

- `examples/sendMessage.js`
- `examples/checkCredits.js`
- `examples/checkDeliveryReports.js`
- `examples/checkReplies.js`
- `examples/2fa.js`

Replace placeholder credentials first, then run:

```bash
node examples/sendMessage.js
```
