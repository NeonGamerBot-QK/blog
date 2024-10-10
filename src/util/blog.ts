import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getBlogFileNames() {
  return fs.readdirSync(path.join(__dirname, "../blog"));
}
export function getBlog(filename: string) {
  const allblogsdata = getBlogData();
  return allblogsdata.find((blog) => blog.fileName === filename);
}
export function getBlogData() {
  const fileNames = getBlogFileNames();
  return fileNames.map((fileName) => {
    const fullPath = path.join(__dirname, "../blog", fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const splits = fileContents.split("---");
    const config = yaml.parse(splits[1]);
    const actualMd = splits.slice(2).join("---");
    return {
      fileName,
      config,
      splits,
      actualMd,
    };
  });
}
