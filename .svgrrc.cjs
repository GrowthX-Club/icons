const path = require('path');
const template = require('./template.cjs');

module.exports = {
  icon: true,
  typescript: true,
  jsxRuntime: 'automatic',
  svgProps: {
    width: '1em',
    height: '1em',
    fontSize: '2.25rem',
  },
  replaceAttrValues: {
    primaryColor: "{ props.primaryColor ?? 'currentColor' }",
    secondaryColor: "{ props.secondaryColor ?? 'currentColor' }",
    strokeWidth: '{ props.strokeWidth ?? 1.2 }',
    stroke: "{ props.stroke ?? 'currentColor' }",
  },
  outDir: 'lib',
  dimensions: false,
  exportType: 'named',
  template,
  indexTemplate: filePaths => {
    const exportEntries = filePaths.map(({ path: filePath }) => {
      const basename = path.basename(filePath, path.extname(filePath));

      return `export { ${basename} } from './${basename}'`;
    });
    return exportEntries.join('\n');
  },
};
