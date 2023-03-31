const operations = [];

module.exports.save = (operation, a, b, result) => {
  operations.push({ operation, a, b, result });

  return operations.length - 1;
};

module.exports.get = (id) => operations[id];
