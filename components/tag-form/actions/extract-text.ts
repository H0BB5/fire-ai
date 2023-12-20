import {
  setTagData,
  setExtractingFrontTag,
} from "@/lib/store/create-tag-slice";
import { ExtractedData } from "@/lib/store/types/state";

export const extractText = async (imageUrl: string) => {
  setExtractingFrontTag(true);
  const ocrResponse = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl: imageUrl }),
  });
  const { response } = await ocrResponse.json();
  const cleaned = response.replace(/`/g, "");
  const jsonString = cleaned.replace("json", "");
  const aiExtract = JSON.parse(jsonString);
  console.log("OCR Response Body:", response); // Log the raw response body
  setTagData({
    frontTagSrc: imageUrl,
    nameOfTagIssuer: aiExtract.nameOfTagIssuer,
    businessName: aiExtract.customerName,
    address: aiExtract.address,
    type: aiExtract.type,
    location: aiExtract.location,
    serial: aiExtract.serial,
    rating: aiExtract.rating,
    lastTestDate: aiExtract.lastTestDate,
  });
  setExtractingFrontTag(false);
};
