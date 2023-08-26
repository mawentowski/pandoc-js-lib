const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function testExecPromisify() {
  try {
    const { stdout } = await exec("ls");
    console.log("Command output:", stdout);
  } catch (error) {
    console.error("Error executing command:", error.message);
  }
}

testExecPromisify();
