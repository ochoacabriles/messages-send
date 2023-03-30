const { Router } = require('express');
const { execute } = require('../controllers/calculator/execute');

const calculatorRouter = Router();

calculatorRouter.get('/execute', (req, res) => {
  const { operation, a, b } = req.query;

  const result = execute(operation, a, b);

  if (result.success) {
    res.send(`Result is ${result.result}`);
  } else {
    res.status(400).send(`Error is ${result.error}`);
  }
});

module.exports = calculatorRouter;
