module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-example-code-pair/dist/esds-example-code-pair.css":
      "styles/esds-example-code-pair.css",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-rendered-example/dist/esds-rendered-example.css":
      "styles/esds-rendered-example.css",
  });

  return {
    dir: {
      // ⚠️ These values are relative to the input directory.
      layouts: "../layouts",
    },
    markdownTemplateEngine: "njk",
  };
};
