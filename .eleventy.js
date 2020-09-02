module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-example-code-pair/dist/esds-example-code-pair.css":
      "styles/esds-example-code-pair.css",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-rendered-example/dist/esds-rendered-example.css":
      "styles/esds-rendered-example.css",
  });

  eleventyConfig.addPassthroughCopy({ "dist/scripts/**/*.js": "scripts" });
  eleventyConfig.addPassthroughCopy({ "dist/styles/**/*.css": "styles" });
  eleventyConfig.addPassthroughCopy({ "src/svg/**/*": "svg" });
  eleventyConfig.addWatchTarget("./dist/styles/**/*.css");

  return {
    dir: {
      // ⚠️ These values are relative to the input directory.
      layouts: "../layouts",
      input: "src/site",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
  };
};
