module.exports.handleResponse = (result, res) => {
  if (result.result === 'success') {
    res.send(`Code sent!!! Message id is ${result.messageId}`);
  } else {
    res.status(500).send(`Failed to send code, reason: ${result.message}`);
  }
};
