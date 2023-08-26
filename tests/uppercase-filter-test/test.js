const fs = require("fs-extra");
const path = require("path");
const { convertMarkdownToJson } = require("../../utils/convertMarkdowntoJson");
const applyFilters = require("../../applyFilters");
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

    // Load the expected output JSON
    const expectedOutputFile = inputFile.replace(".md", ".json");
    const expectedOutput = JSON.parse(
      fs.readFileSync(expectedOutputFile, "utf-8")
    );

    // Compare the filtered JSON with the expected output
    if (JSON.stringify(filteredJSON) === JSON.stringify(expectedOutput)) {
      console.log(`Test passed for ${inputFile}.`);
    } else {
      console.log(`Test failed for ${inputFile}.`);
    }
  } else {
    console.log(`Error processing ${inputFile}.`);
  }
});
