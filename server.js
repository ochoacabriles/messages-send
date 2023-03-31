const express = require('express');
const { port } = require('./config/environment');
const calculatorRouter = require('./routers/calculator');
const notificationsRouter = require('./routers/notifications');

const app = express();

app.use('/notifications', notificationsRouter);
app.use('/calculator', calculatorRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
