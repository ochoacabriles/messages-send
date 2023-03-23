const express = require('express');
const { randomBytes } = require('crypto');

const { port } = require('./config/environment');
const { handleMessagesEndpoints } = require('./helpers/handleMessageEndpoints');
const { sendMail } = require('./helpers/sendEmail');

const app = express();

app.get('/sms', async (req, res) => {
  handleMessagesEndpoints('sms', req, res);
});

app.get('/whatsapp', async (req, res) => {
  handleMessagesEndpoints('whatsapp', req, res);
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
