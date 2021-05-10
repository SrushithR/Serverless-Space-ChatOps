/* eslint-disable max-classes-per-file */
const axios = require("axios");

const { SPACE_ENDPOINT, CHANNEL_NAME, SPACE_AUTH_TOKEN } = process.env;

exports.sendMessage = (event) => {
  console.log(event);
  const { styleType, headerMessage, text, icon, footer } = event;
  return axios
    .post(
      SPACE_ENDPOINT,
      {
        recipient: {
          className: "MessageRecipient.Channel",
          channel: { className: "ChatChannel.FromName", name: CHANNEL_NAME }
        },
        content: {
          className: "ChatMessage.Block",
          style: styleType,
          outline: {
            icon: { icon },
            text
          },
          sections: [
            {
              className: "MessageSection",
              header: headerMessage,
              elements: [],
              footer
            }
          ]
        }
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: SPACE_AUTH_TOKEN
        }
      }
    )
    .then(() => ({
      statusCode: 200,
      body: "Notification triggered successfully"
    }))
    .catch(error => {
      console.log("Error", error);
    });
}


