const babelTemplate = require('@babel/template').smart;
const {
  cloneNode,
  identifier,
  jsxAttribute,
  jsxClosingElement,
  jsxElement,
  jsxExpressionContainer,
  jsxIdentifier,
  jsxOpeningElement,
  jsxSpreadAttribute,
  logicalExpression,
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
  const wrappedSvg = cloneNode(jsx, true);
  wrappedSvg.openingElement.attributes = [
    ...wrappedSvg.openingElement.attributes,
    jsxAttribute(
      jsxIdentifier('style'),
      jsxExpressionContainer(identifier('svgS'))
    ),
  ];
  const wrappedJsx = jsxElement(
    jsxOpeningElement(jsxIdentifier('div'), [
      jsxSpreadAttribute(identifier('props')),
      jsxAttribute(
        jsxIdentifier('style'),
        jsxExpressionContainer(
          objectExpression([
            objectProperty(identifier('display'), stringLiteral('block')),
            objectProperty(
              identifier('width'),
              logicalExpression('??', identifier('width'), stringLiteral('38px'))
            ),
            objectProperty(
              identifier('height'),
              logicalExpression('??', identifier('height'), stringLiteral('38px'))
            ),
            spreadElement(identifier('s')),
            spreadElement(identifier('style')),
          ])
        )
      ),
    ]),
    jsxClosingElement(jsxIdentifier('div')),
    [wrappedSvg],
    false
  );

  return astTpl`${imports}
import type { CSSProperties, HTMLAttributes } from 'react';

type IconCSSProperties = CSSProperties &
  Record<\`--\${string}\`, string | number | undefined>;
type IconSxObject = IconCSSProperties & { svg?: IconCSSProperties };
type SxValue = IconSxObject | null | undefined | false;
type SxProp = SxValue | SxValue[];
type IconSize = CSSProperties['width'];

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  sx?: SxProp;
  style?: IconCSSProperties;
  width?: IconSize;
  height?: IconSize;
}

${interfaces}

function ${componentName}({ sx, style, width, height, ...props }: Props) {
  const sxItems = (Array.isArray(sx) ? sx : [sx]).filter(Boolean) as IconSxObject[];
  const s = Object.assign({}, ...sxItems.map(({ svg, ...root }) => root));
  const svgS = Object.assign({}, ...sxItems.map(({ svg }) => svg).filter(Boolean));
  return ${wrappedJsx};
}

${exports}
  `;
};

module.exports = template;
