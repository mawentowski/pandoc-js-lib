const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");
const { convertMarkdownToJson } = require("../utils/markdownToJson");
const applyFilters = require("../applyFilters");

async function loadJsonFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error loading JSON file:", error.message);
    return null;
  }
}

(async () => {
  try {
    // Load config.yaml
    const configPath = path.join(__dirname, "config.yaml");
    const config = YAML.load(await fs.promises.readFile(configPath, "utf-8"));

    // Load input JSON file
    const inputPath = path.join(__dirname, config.input[0]);
    const inputJSON = await loadJsonFile(inputPath);

    if (!inputJSON) {
      console.error("Error loading input JSON.");
      return;
    }

    // Apply filters
    const transformedJSON = await applyFilters(inputJSON, config.utilities);

    if (!transformedJSON) {
      console.error("Error applying filters.");
      return;
    }

    // Save transformed JSON as expected-output.json
    const expectedOutputPath = path.join(__dirname, "expected-output.json");
    await fs.promises.writeFile(
      expectedOutputPath,
      JSON.stringify(transformedJSON, null, 2)
    );

    console.log("Test completed successfully.");
  } catch (error) {
    console.error("Test error:", error.message);
  }
})();
