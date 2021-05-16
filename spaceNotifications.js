const axios = require("axios");

const {SPACE_ENDPOINT, CHANNEL_NAME, SPACE_AUTH_TOKEN, AWS_REGION} = process.env;

exports.sendMessage = (event) => {
  console.log("Input to the lambda function", event);

  const styleType = "ERROR";
  const headerMessage = `Internal Server Error!`;
  const icon = "bug";
  const CWLink = `https://${AWS_REGION}.console.aws.amazon.com/cloudwatch/home?region=${AWS_REGION}#cw:dashboard=Lambda`;
  const footer = `CloudWatch Lambda Dashboard link - ${CWLink}`;

  return axios
    .post(
      SPACE_ENDPOINT,
      {
        recipient: {
          className: "MessageRecipient.Member",
          member: "me"
          // channel: {className: "ChatChannel.FromName", name: CHANNEL_NAME}
        },
        content: {
          className: "ChatMessage.Block",
          style: styleType,
          outline: {
            icon: {icon},
            text: "Hello"
          },
          sections: [
            {
              className: "MessageSection",
              header: headerMessage,
              elements: [],
              // footer
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


