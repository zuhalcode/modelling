// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import * as fs from "fs";
import * as path from "path";

const writeJSON = (result, filename = "testing-result.json") => {
  const __dirname = path.join(process.cwd(), "src", "data");
  const filePath = path.join(__dirname, filename);

  let existingData = [];

  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create a new file with an empty array
    fs.writeFileSync(filePath, "[]");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  existingData = JSON.parse(fileContent);

  // Append new data to the existing array
  if (Array.isArray(existingData)) {
    existingData.push(result);
  } else {
    existingData = [result]; // If not an array, convert it to an array
  }

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, id } = req.query;

  const numberId = Number(id);

  const result = [];

  for (let index = 0; index < numberId; index++) {
    console.log("Testing ke ", index);
    result.push({ name: `${name} ${index}` });
  }

  writeJSON(result);

  res.status(200).json({ id, result });
}
