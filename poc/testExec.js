const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function testExec() {
  try {
    const { stdout, stderr } = await exec("echo Hello, World!");
    console.log("Stdout:", stdout);
    console.log("Stderr:", stderr);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testExec();
