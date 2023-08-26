const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function convertMarkdownToJson(markdown) {
  try {
    console.log("Starting Pandoc execution...");

    const jsonOutput = await exec(
      `echo '${markdown}' | pandoc -f markdown -t json`,
      {
        encoding: "utf-8",
        stdio: "pipe",
      }
    );

    console.log("Pandoc execution completed.");

    const jsonContent = JSON.parse(jsonOutput.stdout);
    return jsonContent;
  } catch (error) {
    console.error("Error converting Markdown to JSON:", error.message);
    return null;
  }
}

module.exports = { convertMarkdownToJson };
