const { get } = require('../../dataAccess/calculator');

module.exports.get = (idAsString) => {
  const id = Number(idAsString);
  if (isNaN(id)) {
    return {
      success: false,
      error: 'Invalid id',
    };
  }

  const result = get(id);

  if (!result) {
    return {
      success: false,
      error: `Doesn't exist`,
    };
  }

  return {
    success: true,
    result,
  };
};