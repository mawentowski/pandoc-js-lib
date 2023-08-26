const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Define the path to the 'files' folder
const filesFolderPath = path.join(__dirname, "../files");

// Read all files in the 'files' folder
fs.readdir(filesFolderPath, (err, files) => {
  if (err) {
    console.error("Error reading files:", err.message);
    return;
  }

  // Process each Markdown file
  files.forEach((file) => {
    if (file.endsWith(".md")) {
      const markdownPath = path.join(filesFolderPath, file);
      const jsonPath = path.join(
        filesFolderPath,
        `${path.parse(file).name}.json`
      );

      try {
        const jsonOutput = execSync(
          `pandoc -f markdown -t json "${markdownPath}"`,
          {
            encoding: "utf-8",
            stdio: "pipe",
          }
        );

        fs.writeFileSync(jsonPath, jsonOutput);
        console.log(`Converted ${file} to JSON: ${jsonPath}`);
      } catch (error) {
        console.error(`Error converting ${file} to JSON:`, error.message);
      }
    }
  });
});
