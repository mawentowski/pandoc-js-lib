const fs = require("fs-extra");
const path = require("path");
const { convertMarkdownToJson } = require("../../convertMarkdowntoJson");
const applyFilters = require("./applyFilters");
const yaml = require("js-yaml");

// Load config.yaml
const configPath = path.join(__dirname, "config.yaml");
const configContent = fs.readFileSync(configPath, "utf-8");
const config = yaml.load(configContent);

// Loop through input files from config.yaml and process them
config.input.forEach(async (inputFile) => {
  const inputMarkdown = fs.readFileSync(inputFile, "utf-8");
  const jsonContent = await convertMarkdownToJson(inputMarkdown);

  if (jsonContent) {
    // Apply filters
    const filteredJSON = await applyFilters(jsonContent, config.utilities);

    // Write the filtered JSON to a file
    const outputFile = inputFile.replace(".md", ".json");
    fs.writeFileSync(outputFile, JSON.stringify(filteredJSON, null, 2));

    console.log(`Processed ${inputFile} and saved the filtered JSON.`);
  } else {
    console.log(`Error processing ${inputFile}.`);
  }
});
