async function uppercaseFilter(inputJSON) {
  return {
    ...inputJSON,
    blocks: inputJSON.blocks.map((block) => ({
      ...block,
      c: block.c.map((content) => {
        if (typeof content === "string") {
          console.log("Transforming:", content);
          return content.toUpperCase();
        } else {
          return content;
        }
      }),
    })),
  };
}

module.exports = uppercaseFilter;
