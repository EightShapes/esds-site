module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-example-code-pair/dist/esds-example-code-pair.css":
      "styles/esds-example-code-pair.css",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-rendered-example/dist/esds-rendered-example.css":
      "styles/esds-rendered-example.css",
  });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@eightshapes/esds-icons/dist/esds-icons.svg":
      "svg/esds-icons.svg",
  });

  eleventyConfig.addFilter("componentTabSort", function (tabs) {
    const componentTabOrder = [
      "Overview",
      "Code API",
      "Design",
      "Writing",
      "Accessibility",
      "History",
    ];
    let sortedTabs = [];
    componentTabOrder.forEach((tabLabel) => {
      const foundTab = tabs.find((t) => t.data.title === tabLabel);
      if (foundTab !== undefined) {
        sortedTabs.push(foundTab);
      }
    });

    let otherTabs = tabs.filter(
      (t) => !componentTabOrder.includes(t.data.title)
    );

    otherTabs.sort((a, b) => (b.data.title < a.data.title ? 1 : -1));

    return [...sortedTabs, ...otherTabs];
  });

  eleventyConfig.addFilter("postTitleAlphaSort", function (posts) {
    return posts.sort((a, b) => (b.data.title < a.data.title ? 1 : -1));
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
      data: "../_data",
    },
    markdownTemplateEngine: "njk",
  };
};
