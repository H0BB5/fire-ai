const accountSid = "AC45c8a959006c9a18ac3f5fd07ef4a538";
const authToken = "d1e1c62f651a9c5b3f5da60b774aad5e";
const client = require("twilio")(accountSid, authToken);

export async function send() {
  client.messages
    .create({
      body: "Hello from Twilio",
      from: "+18888182518",
      to: "+18777804236",
    })
    .then((message: { sid: string | number }) => console.log(message.sid))
    .done();
  return { response: "[API_NOTIFICATIONS] Notifications sent!" };
}
