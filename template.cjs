const {
  identifier,
  jsxClosingElement,
  jsxElement,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
  arrayExpression,
  jsxAttribute,
  jsxExpressionContainer,
  objectExpression,
  objectProperty,
  stringLiteral,
} = require('@babel/types');
const template = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('Box'), [
      jsxSpreadAttribute(identifier('props')),
      jsxAttribute(
        jsxIdentifier('sx'),
        jsxExpressionContainer(
          arrayExpression([
            objectExpression([
              objectProperty(identifier('width'), stringLiteral('38px')),
              objectProperty(identifier('height'), stringLiteral('38px')),
            ]),
            identifier('props?.sx ?? {}'),
          ])
        )
      ),
    ]),
    jsxClosingElement(jsxIdentifier('Box')),
    [jsx],
    false
  );

  return tpl`${imports}
import { Box, BoxProps } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { Theme } from '@mui/material';

interface Props extends BoxProps {
  sx?: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>);
}

${interfaces}

function ${componentName}(props: Props) {
  return ${wrappedJsx};
}

${exports}
  `;
};

module.exports = template;
