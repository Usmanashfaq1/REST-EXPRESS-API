import fs from "fs/promises";
import { __dirname } from "../utils/path.js";
import path from "path";



// ✅ Path to users.json inside 'data' folder
const filePath = path.join(__dirname, "..", "data", "users.json");

export async function getUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data); // returning a JS object
}

export async function saveUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}
