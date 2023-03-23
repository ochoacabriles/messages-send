const express = require('express');
const { randomBytes } = require('crypto');
const sendMessage = require('./sendMessage');
const sendMail = require('./sendEmail');
const { port } = require('./config/environment');

const app = express();

const handleResponse = (result, res) => {
  if (result.result === 'success') {
    res.send(`Code sent!!! Message id is ${result.messageId}`);
  } else {
    res.status(500).send(`Failed to send code, reason: ${result.message}`);
  }
};

app.get('/sms', async (req, res) => {
  const number = req.query.number;

  if (!number || number.length !== 10) {
    res.status(500).send('10 digit number is required');
    return;
  }

  const result = await sendMessage(number, randomBytes(8).toString('hex'));

  handleResponse(result, res);
});

app.get('/email', async (req, res) => {
  const email = req.query.email;

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(500).send('Email is required in proper format');
    return;
  }

  const result = await sendMail(email, randomBytes(8).toString('hex'));

  handleResponse(result, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
