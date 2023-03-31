const { add, subtract, multiply, divide } = require('ch-calculator-example');
const { save } = require('../../dataAccess/calculator');

const operations = {};
operations.add = (a, b) => add(Number(a), Number(b));
operations.subtract = (a, b) => subtract(Number(a), Number(b));
operations.multiply = (a, b) => multiply(Number(a), Number(b));
operations.divide = (a, b) => divide(Number(a), Number(b));

module.exports.execute = (operation, aAsString, bAsString) => {
  const validOperations = ['add', 'subtract', 'multiply', 'divide'];
  if (!validOperations.includes(operation)) {
    return {
      success: false,
      error: 'Invalid operation',
    };
  }

  const a = Number(aAsString);
  const b = Number(bAsString);

  if (isNaN(a) || isNaN(b)) {
    return {
      success: false,
      error: 'Invalid operands',
    };
  }

  if (operation === 'divide' && a === 0) {
    return {
      success: false,
      error: `Can't divide by 0`,
    };
  }

  // If operation is "add", operations[operation]() is equivalent to operations.add()
  const result = operations[operation](a, b);

  save(operation, a, b, result);

  return {
    success: true,
    result,
  };
}
