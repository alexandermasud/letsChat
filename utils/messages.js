const moment = require("moment");

const formatMessage = (id, username, text) => {
  return {
    id,
    username,
    text,
    time: moment().format("H:mm")
  };
};

module.exports = formatMessage;
