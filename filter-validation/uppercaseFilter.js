async function uppercaseFilter(inputJSON) {
  return {
    ...inputJSON,
    blocks: inputJSON.blocks.map((block) => ({
      ...block,
      c: block.c.map((content) => {
        if (content.t === "Str") {
          console.log("Transforming:", content.c);
          return {
            t: "Str",
            c: content.c.toUpperCase(),
          };
        } else {
          return content;
        }
      }),
    })),
  };
}

module.exports = uppercaseFilter;
