const { Router } = require('express');
const { add, subtract, multiply, divide } = require('ch-calculator-example');

const calculatorRouter = Router();

calculatorRouter.get('/execute', (req, res) => {
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

module.exports = calculatorRouter;
