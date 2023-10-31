const accountSid = 'AC554bd6560d0ed433dd9c343a6e1fc1c5';
const authToken = 'fb65a93f2cf689eed2a7cddef25bd167';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Hi i know coding is hard but never give up.',
    from: '+12106461938',
    to: '+231775311159',
  })
  .then((message) => console.log(message.sid));
