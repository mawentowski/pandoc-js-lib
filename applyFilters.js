// applyFilters.js

// Load your filter modules here (import statements)
const uppercaseFilter = require("./filter-validation/uppercaseFilter");
async function applyFilters(inputJSON, filterPaths) {
  let transformedJSON = { ...inputJSON }; // Create a copy to modify

  for (const filterPath of filterPaths) {
    try {
      const filter = require(filterPath);

      // Apply the filter to the JSON data
      transformedJSON = await filter(transformedJSON);
      console.log(
        "Transformed JSON:",
        JSON.stringify(transformedJSON, null, 2)
      );
    } catch (error) {
      console.error(`Error applying filter: ${filterPath}`);
      console.error(error);
      return null; // Return null on error
    }
  }

  return transformedJSON;
}

module.exports = applyFilters;
