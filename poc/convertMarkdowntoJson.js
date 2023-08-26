const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function convertMarkdownToJson(markdown) {
  console.log(markdown);
  try {
    console.log("Starting Pandoc execution...");
    // const { stdout } = await exec(`pandoc -f markdown -t json`, {
    //   input: markdown,
    // });
    // const { stdout, stderr } = await exec(`pandoc -f markdown -t json`, {
    //   input: markdown,
    //   stdio: ["inherit", "pipe", "pipe"],
    // });

    const { stdout, stderr } = await exec(
      "pandoc hello-world.md -f markdown -t json -o hello-world.json"
    );

    console.log("Stdout:", stdout);
    console.log("Stderr:", stderr);

    console.log("Pandoc execution completed.");
    // const jsonContent = JSON.parse(stdout);
    // return jsonContent;
  } catch (error) {
    console.error("Error converting Markdown to JSON:", error.message);
    return null;
  }
}

module.exports = { convertMarkdownToJson };
