async function uppercaseFilter(inputJSON) {
  // Apply your filter logic here
  // For example, convert all strings to uppercase
  return {
    ...inputJSON,
    blocks: inputJSON.blocks.map((block) => ({
      ...block,
      c: block.c.map((content) =>
        typeof content === "string" ? content.toUpperCase() : content
      ),
    })),
  };
}

module.exports = uppercaseFilter;
