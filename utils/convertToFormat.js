const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function convertToFormat(jsonData, outputFormat) {
  try {
    let convertedContent;

    // Convert JSON to the desired output format
    if (outputFormat === "html") {
      // Convert to HTML using Pandoc
      console.log("Starting Pandoc conversion...");

      const jsonInput = JSON.stringify(jsonData);
      // console.log(jsonInput);
      const { stdout } = await exec(
        `echo '${jsonInput}' | pandoc -f json -t ${outputFormat}`,
        {
          encoding: "utf-8",
          stdio: "pipe",
        }
      );

      convertedContent = stdout;

      console.log("Pandoc conversion completed.");
    } else if (outputFormat === "pdf") {
      // Convert to PDF using a suitable tool or library
      // Implement the conversion logic for PDF format
      console.log("Converting to PDF...");

      // Example: You might use a library like puppeteer to generate PDF
      // const pdf = await generatePDF(jsonData);
      // convertedContent = pdf;

      console.log("PDF conversion completed.");
    } else {
      console.error(`Unsupported output format: ${outputFormat}`);
      return null;
    }

    return convertedContent;
  } catch (error) {
    console.error("Error converting to format:", error.message);
    return null;
  }
}

module.exports = convertToFormat;
