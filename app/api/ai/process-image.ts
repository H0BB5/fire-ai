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
        role: "user",
        content: [
          {
            type: "text",
            text: "This is an image of a Fire Tag, please extract the following information from the image: Name, Address, Type, Serial, Location, Rating, and Size.",
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
  return { response: response.choices[0] };
}
