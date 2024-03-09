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
    jsxOpeningElement(jsxIdentifier('SvgIcon'), [
      jsxSpreadAttribute(identifier('props')),
    ]),
    jsxClosingElement(jsxIdentifier('SvgIcon')),
    [jsx],
    false
  );

  return tpl`${imports}
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
${interfaces}

function ${componentName}(props: SvgIconProps) {
  return ${wrappedJsx};
}

${exports}
  `;
};

module.exports = template;
