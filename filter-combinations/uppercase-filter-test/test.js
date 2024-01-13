const fs = require("fs-extra");
const path = require("path");
const { convertMarkdownToJson } = require("../../utils/convertMarkdowntoJson");
const applyFilters = require("../../applyFilters");
const convertToFormat = require("../../utils/convertToFormat"); // Import the module
const yaml = require("js-yaml");

// Load config.yaml
const configPath = path.join(__dirname, "config.yaml");
const configContent = fs.readFileSync(configPath, "utf-8");
const config = yaml.load(configContent);

// Specify the output format (e.g., "html" or "pdf") in the config.yaml
const outputFormat = config.outputFormat; // Get the output format from config
// Loop through input files from config.yaml and process them
// Loop through input files from config.yaml and process them
// Loop through input files from config.yaml and process them
// Loop through input files from config.yaml and process them
config.input.forEach(async (inputFile) => {
  const inputFileWithoutExtension = path.basename(inputFile, ".md");
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

    // Convert JSON-formatted AST to the desired output format
    const convertedContent = await convertToFormat(filteredJSON, outputFormat);

    // Save the converted content to a file
    const outputDirectory = path.join(__dirname, "output");
    const outputFile = path.join(
      outputDirectory,
      `${inputFileWithoutExtension}.${outputFormat}`
    );
    fs.writeFileSync(outputFile, convertedContent);

    console.log(`Converted content saved to ${outputFile}`);
  } else {
    console.log(`Error processing ${inputFile}.`);
  }
});
