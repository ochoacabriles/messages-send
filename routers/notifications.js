const { Router } = require('express');
const { sendEmail } = require('../controllers/notifications/sendEmail');

const notificationsRouter = Router();

notificationsRouter.get('/email', async (req, res) => {
  const email = req.query.email;

  const result = await sendEmail(email);

  if (result.success) {
    res.send(`Code sent!!! Message id is ${result.messageId}`);
  } else {
    res.status(500).send(`Failed to send code, reason: ${result.reason}`);
  }
});

module.exports = notificationsRouter;
