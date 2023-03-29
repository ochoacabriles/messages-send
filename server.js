const express = require('express');
const { randomBytes } = require('crypto');

const { port } = require('./config/environment');
const { handleMessagesEndpoints } = require('./helpers/handleMessageEndpoints');
const { sendMail } = require('./helpers/sendEmail');

const { add, subtract, multiply, divide } = require('ch-calculator-example');

const app = express();

app.get('/calculator', (req, res) => {
  const { operation, a, b } = req.query;

  const validOperations = ['add', 'subtract', 'multiply', 'divide'];
  if (
    !validOperations.includes(operation) ||
    a === undefined ||
    b === undefined ||
    (operation === 'divide' && a === 0)
  ) {
    res.status(404).send(`Bad params`);
    return;
  }

  if (operation === 'add') {
    res.send(`a + b = ${add(a, b)}`);
  } else if (operation === 'subtract') {
    res.send(`b - a = ${subtract(a, b)}`);
  } else if (operation === 'multiply') {
    res.send(`a * b = ${multiply(a, b)}`);
  } else if (operation === 'divide') {
    res.send(`b / a = ${divide(a, b)}`);
  }
});

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
