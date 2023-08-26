// Import the convertMarkdownToJson function from the convertMarkdowntoJson.js module:
const { convertMarkdownToJson } = require("./convertMarkdowntoJson.js");

// Your Markdown content
const markdownContent = `
# Hello, World!

This is a sample Markdown document.
`;

console.log("Starting Markdown to JSON conversion...");

// Call the function and pass the Markdown content
convertMarkdownToJson(markdownContent)
  .then((jsonContent) => {
    // The JSON content will be available here
    console.log("Conversion completed. Converted JSON:", jsonContent);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
