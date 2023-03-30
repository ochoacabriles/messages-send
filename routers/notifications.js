const { Router } = require('express');
const { randomBytes } = require('crypto');
const { handleResponse } = require('../helpers/handleResponse');
const { handleMessagesEndpoints } = require('../helpers/handleMessageEndpoints');
const { sendEmail } = require('../helpers/sendEmail');

const notificationsRouter = Router();

notificationsRouter.get('/sms', async (req, res) => {
  handleMessagesEndpoints('sms', req, res);
});

notificationsRouter.get('/whatsnotificationsRouter', async (req, res) => {
  handleMessagesEndpoints('whatsnotificationsRouter', req, res);
});

notificationsRouter.get('/email', async (req, res) => {
  const email = req.query.email;

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(500).send('Email is required in proper format');
    return;
  }

  const result = await sendEmail(email, randomBytes(8).toString('hex'));

  handleResponse(result, res);
});

module.exports = notificationsRouter;
