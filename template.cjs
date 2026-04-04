const babelTemplate = require('@babel/template').smart;
const {
  identifier,
  jsxAttribute,
  jsxClosingElement,
  jsxElement,
  jsxExpressionContainer,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
  objectExpression,
  objectProperty,
  spreadElement,
  stringLiteral,
} = require('@babel/types');

const template = (
  { imports, interfaces, componentName, jsx, exports },
  { tpl }
) => {
  const astTpl = babelTemplate({
    plugins: ['jsx', 'typescript'],
    preserveComments: true,
    syntacticPlaceholders: false,
  }).ast;
  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('div'), [
      jsxSpreadAttribute(identifier('props')),
      jsxAttribute(
        jsxIdentifier('style'),
        jsxExpressionContainer(
          objectExpression([
            objectProperty(identifier('display'), stringLiteral('block')),
            objectProperty(identifier('width'), stringLiteral('38px')),
            objectProperty(identifier('height'), stringLiteral('38px')),
            spreadElement(identifier('s')),
            spreadElement(identifier('style')),
          ])
        )
      ),
    ]),
    jsxClosingElement(jsxIdentifier('div')),
    [jsx],
    false
  );

  return astTpl`${imports}
import type { CSSProperties, HTMLAttributes } from 'react';

type IconCSSProperties = CSSProperties &
  Record<\`--\${string}\`, string | number | undefined>;
type SxValue = IconCSSProperties | null | undefined | false;
type SxProp = SxValue | SxValue[];

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  sx?: SxProp;
  style?: IconCSSProperties;
}

${interfaces}

function ${componentName}({ sx, style, ...props }: Props) {
  const s = Array.isArray(sx) ? Object.assign({}, ...sx.filter(Boolean)) : (sx ?? {});
  return ${wrappedJsx};
}

${exports}
  `;
};

module.exports = template;
