const template = (variables, { tpl, options }) => {
  const componentName = variables.componentName.substring(3);

  const dir = options.state.filePath.split('/').slice(1, -1).join('/');

  const relativePath = `/${dir}/${componentName}`.replace('//', '/');

  return tpl`
import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string,
  secondaryColor?: string
}

${variables.interfaces};

export const ${componentName} = (props: IconProps) => (
  ${variables.jsx}
);



${componentName}.path = "${relativePath}"

export default ${componentName}

`;
};
module.exports = template;
