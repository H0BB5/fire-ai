import OpenAI from "openai";
import Configuration from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function imageOCR(image: string) {
  console.log("imageOCR!!!!", image);
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: "You are an excellent fire tag technician.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "This is an image of a Fire Tag, please analyze the tag and output the values for the following properties to JSON: nameOfTagIssuer, customerName, address, location, serial, rating, type, fireTagDetected, and lastTestDate. If there is no value for a property, then return an empty string for that property. If the photo does not have a fire tag in it then return the JSON object with the fireTagDetected property to false.",
          },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
    max_tokens: 500,
  });

  // const response = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   response_format: { type: "json_object" },
  //   messages: [
  //     {
  //       role: "system",
  //       content: "You are an excellent fire tag technician.",
  //     },
  //     {
  //       role: "user",
  //       content: [
  //         {
  //           type: "text",
  //           text: "This is an image of a Fire Tag, please analyze the tag and return the results. If the photo does not have a fire tag in it, then say `No fire tag detected, please upload a new photo.`",
  //         },
  //         {
  //           type: "image_url",
  //           image_url: {
  //             url: image,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   functions: [
  //     {
  //       name: "extract_data",
  //       parameters: {
  //         type: "object",
  //         properties: {
  //           businessName: {
  //             type: "string",
  //           },
  //           address: { type: "string" },
  //           location: { type: "string" },
  //           serial: { type: "string" },
  //           rating: { type: "string" },
  //           type: {
  //             type: "string",
  //             values: ["Fire Extinguisher", "Fire Hose", "System"],
  //           },
  //           lastTestDate: { type: "string" },
  //         },
  //       },
  //     },
  //   ],
  //   max_tokens: 500,
  // });
  // return { response: response.choices[0].message.function_call?.arguments };
  return { response: response.choices[0].message.content };
}
