import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content: messages + "You are an excellent fire tag technician.",
      },
      {
        role: "user",
        content:
          "This is an image of a Fire Tag, please analyze the tag and output the values for the following properties to JSON: nameOfTagIssuer, customerName, address, type (value: extinguisher, fire alarm, or sprinkler), fireTagDetected, and lastTestDate. If there is no value for a property, then return an empty string for that property. If the photo does not have a fire tag in it then return the JSON object with the fireTagDetected property to false.",
      },
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
