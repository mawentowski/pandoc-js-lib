const pandocFilter = require("pandoc-filter-node");
const { convertMarkdownToJson } = require("./markdownToJson");

// Load your custom filter
require("./uppercase"); // Assuming the filter is named uppercase.js

async function applyUppercaseFilter(markdown) {
  const jsonContent = await convertMarkdownToJson(markdown);
  if (!jsonContent) {
    return null;
  }

  const sourceJSON = JSON.stringify(jsonContent);
  const output = pandocFilter.runFilter(JSON.parse(sourceJSON));
  return JSON.stringify(output);
}

module.exports = { applyUppercaseFilter };
