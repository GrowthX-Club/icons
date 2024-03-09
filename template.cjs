const {
  identifier,
  jsxClosingElement,
  jsxElement,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
} = require('@babel/types');
const template = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('Box'), [
      jsxSpreadAttribute(identifier('props')),
    ]),
    jsxClosingElement(jsxIdentifier('Box')),
    [jsx],
    false
  );

  return tpl`${imports}
import Box,{ BoxProps } from '@mui/material/Box';

${interfaces}

function ${componentName}(props: BoxProps) {
  return ${wrappedJsx};
}

${exports}
  `;
};

module.exports = template;
