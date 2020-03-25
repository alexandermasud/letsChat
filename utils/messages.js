const moment = require("moment");

const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("H:mm")
  };
};

module.exports = formatMessage;
