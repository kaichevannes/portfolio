import { execSync } from "child_process";
import { readdirSync, statSync } from "fs";

const pages = readdirSync(".")
  .filter((path) => statSync(path).isDirectory())
  .filter((folder) => !folder.startsWith("_") && !folder.startsWith("."))
  .map((folder) => `${folder}/index.html`);

pages.push("index.html");

pages.forEach((page) => {
  console.log(`Processing ${page}...`);
  execSync(`npx critical ${page} --inline --base . --target ${page}`, {
    stdio: "inherit",
  });
});
