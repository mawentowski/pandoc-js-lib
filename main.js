const fs = require("fs");
const path = require("path");
const { convertMarkdownToJson } = require("./utils/convertMarkdowntoJson.js");

// Directory where Markdown and JSON files are located
const filesDirectory = path.join(__dirname, "source-files");

// Read Markdown files in the directory
fs.readdir(filesDirectory, (err, files) => {
  if (err) {
    console.error("Error reading files directory:", err);
    return;
  }

  // Iterate through each Markdown file
  files.forEach((filename) => {
    if (filename.endsWith(".md")) {
      const markdownFilePath = path.join(filesDirectory, filename);

      // Read the content of the Markdown file
      fs.readFile(markdownFilePath, "utf8", (err, markdownContent) => {
        if (err) {
          console.error(`Error reading file ${filename}:`, err);
          return;
        }

        // Convert Markdown to JSON
        convertMarkdownToJson(markdownContent)
          .then((jsonContent) => {
            const jsonFilename = filename.replace(".md", ".json");
            const jsonFilePath = path.join(filesDirectory, jsonFilename);

            // Write JSON content to file
            fs.writeFile(
              jsonFilePath,
              JSON.stringify(jsonContent, null, 2),
              (err) => {
                if (err) {
                  console.error(
                    `Error writing JSON file ${jsonFilename}:`,
                    err
                  );
                } else {
                  console.log(`Converted ${filename} to ${jsonFilename}`);
                }
              }
            );
          })
          .catch((error) => {
            console.error(`Error converting ${filename} to JSON:`, error);
          });
      });
    }
  });
});
