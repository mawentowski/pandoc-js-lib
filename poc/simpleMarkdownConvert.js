const markdown = `
# Hello, World!

This is a sample Markdown document.
`;

const { execSync } = require("child_process");

try {
  const jsonOutput = execSync(
    `echo '${markdown}' | pandoc -f markdown -t json`,
    {
      encoding: "utf-8",
      stdio: "pipe",
    }
  );

  console.log(jsonOutput);
} catch (error) {
  console.error("Error converting Markdown to JSON:", error.message);
}
