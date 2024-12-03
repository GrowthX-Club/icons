import type { IconProps } from '@/types/icon';

type IconsType = (props: IconProps) => JSX.Element;

type Props = IconProps & {
  Component: IconsType | null;
};

export const Icon = ({ Component, ...props }: Props) => {
  if (!Component) return null;

  return <Component {...props} style={{ border: '1px solid blue' }} />;
};
