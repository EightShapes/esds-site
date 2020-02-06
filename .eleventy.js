module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({"node_modules/@eightshapes/esds-icon/dist/esds-icon.js" : "scripts/EsdsIcon.js"});

  return {
    dir: {
        // ⚠️ These values are relative to the input directory.
        layouts: "../layouts"
    }
  }
}
